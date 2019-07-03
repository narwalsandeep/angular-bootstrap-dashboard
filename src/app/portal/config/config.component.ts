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
  
  /**
   * 
   */
  object:any;
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
      if(k.name == _t.object.name){
        _t.object = k;
        _t._id = k._id;
      }
    });
    // assign defaults or values from db
    this.object.fields.forEach(function (k) {
      //_t.el[k.name] = k.default_value;
    });
  }


  /**
   * 
   */
  onClick_AddMenu(){
    this._reset();
    this.is_object_selected = false;
    this.is_adding_object = true;
  }

}
