import { Component, OnInit,ViewChild } from '@angular/core';
import { BusinessService } from '../../_service/business.service';
import { AuthHelper } from '../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../../_service/_alert.service';
import { ModalComponent } from '../../_com/modal/modal.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  
  @ViewChild(ModalComponent,{static:true}) modal:ModalComponent;

  title = "";
  is_loading = false;
  _id = "";

  /**
   * 
   */
  config:any;
  object:any;
  selected = "form";
  types = [
    {
      "name": "form"
    },
    {
      "name": "static"
    },
    {
      "name": "grid"
    },
    {
      "name":"code"
    }
  ]

  
  /**
   * 
   */
  default = {"label":"","name":"","status":"Active"};
  is_adding_object = false;
  is_object_selected = false;
  
  /**
   * 
   */
  _bool = [{ "value": true }, { "value": false }];

  /**
   * 
   * @param businessService 
   */
  constructor(
    private businessService: BusinessService,
    private authHelper: AuthHelper,
    private _alert: AlertService,
    private router: Router
    ) { 
      this.title = "Configurator";
      this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    this._getBusiness();
  }

  /**
   * 
   */
  ngOnInit() {
  }

  /**
   * 
   */
  _reset(){
    this.is_object_selected = false;
    this.is_adding_object = false;
    this.is_loading = false;
    this.title = "Configurator";

  }

  onClick_CustomMenu(e) {
    this.selected = e.name;
  }


  /**
   * 
   * @param p 
   */
  onClick_Item(object){
    this._reset();
    this.is_object_selected = true;
    this.object = object;
    this._getBusiness();
  }


  /**
   * 
   */
  _getBusiness(){
    let _p = {"id":this.authHelper.getUser().business.id};
    let _t = this;
    this.businessService.read(_p).subscribe(function(data){
      let temp :any;
      temp = data;
      _t.config = JSON.parse(temp.payload.config);
      if(_t.is_object_selected){
        _t._assignValues();
      }
    });
  }

  /**
   * 
   */
  _assignValues(){
    let _t = this;
    // reassign selected_obj here, because this method
    // if call by other as well, it will refresh values of seleccted obj
    this.config.config.infra.object.forEach((k)=>{
      if(k._id == _t.object._id){
        _t.object = k;
        _t._id = k._id;
      }
    });
    // assign defaults or values from db
    this.object.fields.forEach(function (k) {
      //_t.el[k.name] = k.default_value;
    });
  }

  onRefreshConfig(){
    this._getBusiness();
  }
  /**
   * 
   */
  onClick_AddObject(){
    this._reset();
    this.object = this.default;
    this.is_object_selected = false;
    this.is_adding_object = true;
  }

  onClick_Submit() {
    if (this._validate()) {
      let _p = { "inject_into_object": true, "object": JSON.stringify(this.object) };
      this.businessService.updateConfig(_p).subscribe(data => {
        let temp: any;
        temp = data;
        if (temp.error) {
          this._alert.error(temp.msg);
        }
        else {
          this._alert.success(temp.msg);
        }
      },
      error => {
        this._alert.error("Server Error");
      });
    }
  }

   /**
   * 
   * @param f 
   */
  onClick_TryDelete() {
    this.modal.show();
  }

  /**
   * 
   */
  onClick_DeleteObject() {
    let _p = { "delete_object": true,  "object": JSON.stringify(this.object) };
    let _t = this;
    this.businessService.updateConfig(_p).subscribe(data => {
      let temp: any;
      temp = data;
      this._alert.success(temp.msg);

    });
  }


  _validate() {
    if (this.object.name == "") {
      this._alert.error("Name cannot be empty");
      return false;
    }
    if (this.object.label == "") {
      this._alert.error("Label cannot be empty");
      return false;
    }
    return true;
  }

}
