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

  title = "CONFIGURATOR";
  is_loading = false;
  action = "Select An Item";
  selected_obj:any;
  is_obj_selected = false;

  editing_el:any;
  editing_menu: any;
  is_edit_element = false;
  is_add_element = false
  is_add_obj = false;
  menu = [];
  el = [];
  cfg:any;
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
    this.is_add_element = false;
    this.is_obj_selected = false;
    this.is_add_obj = false;
    this.editing_el = undefined;
    this.is_edit_element = false;
    this.is_loading = false;
    this.action = "Select An Item";
    this.title = "CONFIGURATOR";

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selected_obj.fields, event.previousIndex, event.currentIndex);
    this.onFieldReorder(event);
  }

  onFieldReorder(event) {
    let _p = { "sort_fields":true,"from":event.previousIndex,"to":event.currentIndex,"process_el": JSON.stringify(this.selected_obj), "el": JSON.stringify(this.el) };
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

  /**
   * 
   */
  _getBusiness(){
    let _p = {"id":this.authHelper.getUser().business.id};
    let _t = this;
    this.businessService.read(_p).subscribe(function(data){
      let temp :any;
      temp = data;
      _t.cfg = JSON.parse(temp.payload.config);
      if(_t.is_obj_selected){
        _t._assignValues();
      }
    });
  }


  /**
   * 
   * @param p 
   */
  onClick_Item(obj){
    this._reset();
    this.is_obj_selected = true;
    this.selected_obj = obj;
    this._getBusiness();
  }

  /**
   * 
   */
  _assignValues(){
    let _t = this;
    // reassign selected_obj here, because this method
    // if call by other as well, it will refresh values of seleccted obj
    this.cfg.config.infra.process.forEach((k)=>{
      if(k.name == _t.selected_obj.name){
        _t.selected_obj = k;
      }
    });
    // assign defaults or values from db
    this.selected_obj.fields.forEach(function (k) {
      _t.el[k.name] = k.default_value;
    });
  }

  /**
   * 
   * @param f 
   */
  onClick_TryDelete(f){
    this.editing_el = f;
    this.modal.show();
  }

  /**
   * 
   */
  onClick_DeleteField(){
    let _p = {"delete_field":true,"el":JSON.stringify(this.editing_el),"process_el":JSON.stringify(this.selected_obj)};
    let _t = this;
    this.businessService.updateConfig(_p).subscribe(data=>{
      let temp:any;
      temp = data;
      _t._getBusiness();

    });
  }


  /**
   * 
   */
  onClick_AddElement(){
    this._reset();
    this.is_add_element = true;
    this.action = "Add Element";
  }

  /**
   * 
   */
  onClick_EditElement(el){
    this._reset();
    this.editing_el = el;
    this.is_edit_element = true;
    this.action = "Edit Element: " +el.name;
  }

  /**
   * 
   */
  onClick_AddMenu(){
    this._reset();
    this.is_add_obj = true;
    this.action = "Add Menu";
  }

}
