import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService } from '../../_service/business.service';
import { AuthHelper } from '../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertService } from '../../_service/_alert.service';
import { ModalComponent } from '../../_com/modal/modal.component';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

  treeConfig = {
    showActionButtons: true,
    showAddButtons: false,
    showRenameButtons: false,
    showDeleteButtons: false,
    showRootActionButtons: false, // set false to hide root action buttons.
    enableExpandButtons: true,
    enableDragging: true,
    rootTitle: 'Menus Items:',
    validationText: '',
    minCharacterLength: 5,
    setItemsAsLinks: false,
    setFontSize: 14,
    setIconSize: 12
  };

  /*
  myTree = [
    {
      name: 'Apple',
      childrens:[],
      id: 1,
      options: {
        hidden: false,
        position: 1,
        href: 'https://github.com/Zicrael/ngx-tree-dnd'
      }
    }
  ];
  */
  menuTree:any;

  title = "";
  is_loading = false;
  _id = "";

  /**
   * 
   */
  config: any;
  object: any;
  menu:any;
  menu_default = {"_id":"","name":"","status":"Active","type":"internal","link":"","level":1,"children":[]};

  /**
   * 
   */
  object_default = { "label": "", "name": "", "status": "Active", "home": "No", "parent": "root" };
  is_adding_object = false;
  is_object_selected = false;
  is_adding_menu = false;
  is_editing_menu = false;
  is_menu_selected = false;

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
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };

    this._getBusiness();
  }

  /**
   * 
   */
  ngOnInit() {
    this.menu = this.menu_default;
  }

  /**
   * 
   */
  _reset() {
    this.is_object_selected = false;
    this.is_adding_object = false;
    this.is_menu_selected = false;
    this.is_adding_menu = false;
    this.is_editing_menu = false;
    this.is_loading = false;
    this.title = "Configurator";

  }

  /**
   * 
   * @param p 
   */
  onClick_Object(object) {
    this._reset();
    this.is_object_selected = true;
    this.is_menu_selected = false;
    this.is_adding_menu = false;
    this.object = object;
    console.log(this.object);
    this._getBusiness();
  }

  
  onDragStart(event) {
    console.log(event);
  }
  onDrop(event) {
    console.log(event);
  }
  onAllowDrop(event) {
    console.log(event);
  }
  onDragEnter(event) {
    console.log(event);
  }
  onDragLeave(event) {
    console.log(event);
  }
  onAddItem(event) {
    console.log(event);
  }
  onStartRenameItem(event) {
    console.log(event);
  }
  onFinishRenameItem(event) {
    console.log(event);
  }
  onStartDeleteItem(event) {
    console.log('start delete');
  }
  onFinishDeleteItem(event) {
    console.log('finish delete');
  }
  onCancelDeleteItem(event) {
    console.log('cancel delete');
  }

  onClick_MenuItem(e){
    this._reset();

    this.menu._id = e.target.parentElement.parentElement.parentElement.parentElement.id;
    console.log(this.menu);
    this._startEditMenu();
  }

  _startEditMenu(){
    
    this.is_menu_selected = true;
    this.is_adding_menu = false;
    this.is_editing_menu = true;
  }

  /**
   * 
   */
  _getBusiness() {
    let _p = { "id": this.authHelper.getUser().business.id };
    let _t = this;
    this.businessService.read(_p).subscribe(function (data) {
      let temp: any;
      temp = data;
      _t.config = JSON.parse(temp.payload.config);
      _t._buildMenuTree();
      if (_t.is_object_selected) {
        _t._assignObjectValues();
      }
      if (_t.is_menu_selected) {
        _t._assignMenuValues();
      }

    });
  }

  /**
   * 
   */
  _buildMenuTree(){
    let m = [];
    let i:any;
    this.config.config.infra.menu.forEach((k,l)=>{
       i = {
        name: k.name,
        childrens:[],
        id: k._id,
        options: {
          hidden: false,
          position: l,
          href: 'https://github.com/Zicrael/ngx-tree-dnd'
        }
      }
      m.push(i);
    });
    this.menuTree = m;
  }


  /**
   * 
   */
  _assignObjectValues() {
    let _t = this;
    // reassign selected_obj here, because this method
    // if call by other as well, it will refresh values of seleccted obj
    this.config.config.infra.object.forEach((k) => {
      if (k._id == _t.object._id) {
        _t.object = k;
        _t._id = k._id;
      }
    });
  }

  /**
 * 
 */
  _assignMenuValues() {
    let _t = this;
    // reassign selected_obj here, because this method
    // if call by other as well, it will refresh values of seleccted obj
    this.config.config.infra.menu.forEach((k) => {
      if (k._id == _t.menu._id) {
        _t.menu = k;
        _t._id = k._id;
      }
    });
  }

  onRefreshConfig() {
    this._getBusiness();
  }

  /**
   * 
   */
  onClick_AddObject() {
    this._reset();
    this.object = this.object_default;
    this.is_object_selected = false;
    this.is_adding_object = true;
    //
    this.is_adding_menu = false;
    this.is_menu_selected = false;
  }

  /**
   * 
   */
  onClick_AddMenu() {
    this._reset();
    this.menu = this.menu_default;
    this.is_menu_selected = false;
    this.is_adding_menu = true;
    this.is_editing_menu = false;
    //
    this.is_object_selected = false;
    this.is_adding_object = false;
  }

}
