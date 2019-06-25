import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../_service/business.service';
import { AuthHelper } from '../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  title = "CONFIGURATOR";
  is_loading = false;
  action = "Select An Item";
  selected_obj:any;
  new_obj_name = "";
  is_obj_selected = false;

  editing_el:any;
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
    this.is_edit_element = false;
    this.is_loading = false;
    this.action = "Select An Item";
    this.title = "CONFIGURATOR";

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selected_obj.fields, event.previousIndex, event.currentIndex);
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
      _t._loadConfig();
    });
  }

  /**
   * 
   */
  _loadConfig(){
    this.cfg.config.infra.process.forEach(el => {
      //console.log(el);
    });
  }

  onClick_Item(p){
    this._reset();
    this.is_obj_selected = true;
    this.selected_obj = p;
    this.action = p.name;
    this._assignValues();
  }

  /**
   * 
   */
  _assignValues(){
    // assign defaults or values from db
    let _t = this;
    this.selected_obj.fields.forEach(function (k) {
      _t.el[k.name] = k.default_value;
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
    this.action = "Edit Element";
  }

  /**
   * 
   */
  onClick_AddMenu(){
    this._reset();
    this.is_add_obj = true;
  }

  /**
   * 
   */
  onSubmit_AddMenu(){
    console.log(this.new_obj_name);
  }
}
