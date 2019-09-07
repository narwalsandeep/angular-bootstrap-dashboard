import { Component, OnInit, Input, SimpleChange, SimpleChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { BusinessService } from '../../../../_service/business.service';
import { AuthHelper } from '../../../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../../../../_service/_alert.service';
import { ModalComponent } from '../../../../_com/modal/modal.component';

@Component({
  selector: 'app-menu-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() menu:any;
  @Input() edit = false;
  /**
  export interface TreeModel {
    name: string; // name of item
    id: number; // id of item
    options?: TreeItemOptions; // options of item
    childrens: TreeModel[]; // childrens list
  }
  export interface TreeItemOptions {
      // item options
      href?: string;
      hidden?: boolean;
      hideChildrens?: boolean;
      draggable?: boolean;
      position?: number;
      edit?: boolean;
      disabled?: boolean;
      // item buttons
      showDropChildZone?: boolean;
      showActionButtons?: boolean;
      showDeleteButton?: boolean;
      showExpandButton?: boolean;
  }
  */

  title = "";
  types = [
    {
      "name": "internal",
      "label": "Connect To A Page"
    },
    {
      "name": "external",
      "label": "Link To An Url"
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
    console.log(this.menu);
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
  }

  onClick_Type(e) {
    this.menu.type = e.name;
    //this.selected = e.name;
  }

  onClick_Submit() {
    if (this._validate()) {
      let _p = { "inject_into_menu": true, "menu": JSON.stringify(this.menu) };
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


  _validate() {
    if (this.menu.name == "") {
      this._alert.error("Name cannot be empty");
      return false;
    }
    
    return true;
  }


}
