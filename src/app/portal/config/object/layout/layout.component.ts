import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { BusinessService } from '../../../../_service/business.service';
import { AuthHelper } from '../../../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertService } from '../../../../_service/_alert.service';
import { ModalComponent } from '../../../../_com/modal/modal.component';

@Component({
  selector: 'app-object-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

  @Input() object: any;
  element:any;
  el_list = [];
  fields: any;
  is_adding_element = false;
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
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    // this._assignValues();

  }

  ngOnInit() {
    this.fields = this.object.fields;
    console.log("f");
    console.log(this.fields);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] != undefined) {
      this.object = changes['object'].currentValue;
      this._assignValues();
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.object.fields, event.previousIndex, event.currentIndex);
    if (event.previousIndex != event.currentIndex) {
      this.onFieldReorder(event);
    }
    else {
      this._alert.error("Nothing changed");
    }
  }

  onFieldReorder(event) {

    let _p = { "sort_fields": true, "from": event.previousIndex, "to": event.currentIndex, "object": JSON.stringify(this.object), "element": JSON.stringify(this.element) };
    
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
  _assignValues() {
    let _t = this;

    // assign defaults or values from db
    this.object.fields.forEach(function (k) {
      _t.el_list[k.name] = k.default_value;
    });
  }

  /**
   * 
   */
  onClick_AddElement() {
    this.is_adding_element = true;
    console.log(this.object);
    console.log(this.element);
  }

  /**
   * 
   * @param f 
   */
  onClick_EditElement(f) {
    this.element = f;
    this.is_adding_element = true;
  }

  onClick_BackFromAddElement(){
    this.is_adding_element = false;
    this._getBusiness();
  }

  /**
   * 
   * @param f 
   */
  onClick_TryDelete(f) {
    this.element = f;
    this.modal.show();
  }

  /**
   * 
   */
  onClick_DeleteField() {
    let _p = { "delete_field": true, "element": JSON.stringify(this.element), "object": JSON.stringify(this.object) };
    let _t = this;
    this.businessService.updateConfig(_p).subscribe(data => {
      let temp: any;
      temp = data;
      _t._getBusiness();
    });
  }

  /**
  * 
  */
  _getBusiness() {
    let _p = { "id": this.authHelper.getUser().business.id };
    let _t = this;
    this.businessService.read(_p).subscribe(function (data) {
     //let temp: any;
     //  temp = data;
     //    let _id = _t.object;
     //      _t.object = JSON.parse(temp.payload.config.infra.object);
    });
  }



}
