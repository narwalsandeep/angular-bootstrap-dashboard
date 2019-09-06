import { Component, OnInit, Input, SimpleChange, SimpleChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { BusinessService } from '../../../../_service/business.service';
import { AuthHelper } from '../../../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../../../../_service/_alert.service';
import { ModalComponent } from '../../../../_com/modal/modal.component';

@Component({
  selector: 'app-object-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() object: any;
  @Output() refreshConfig = new EventEmitter<boolean>();
  @ViewChild(ModalComponent,{static:true}) modal:ModalComponent;

  _id = "";
  config:any;
  is_object_selected = false;
  title = "";
  selected = "";
  types = [
    {
      "name": "form",
      "label": "A Form"
    },
    {
      "name": "static",
      "label": "HTML Page"
    },
    {
      "name": "grid",
      "label": "Images Gallery"
    },
    {
      "name":"code",
      "label": "HTML Widget"
    }
  ]

  /**
   * 
   */
  constructor(
    private businessService: BusinessService,
    private authHelper: AuthHelper,
    private _alert: AlertService,
    private router: Router
    ) { 
      this.title = "Configurator";
      this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

  }

  ngOnInit() {
    this.selected = this.object.type;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] != undefined)
      this.object = changes['object'].currentValue;
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


  onClick_Type(e) {
    this.object.type = e.name;
    //this.selected = e.name;
  }

  // if chancing here, also change in settings component
  onRefreshConfig(e){
    this.refreshConfig.emit(true);
    // emit from this to its parent to call business main config json, so it get refresh all over
    // refreshConfig must be added as many places to its get refresh everywhere.
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
