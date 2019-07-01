import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { BusinessService } from '../../../../_service/business.service';
import { AuthHelper } from '../../../../_helper/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AlertService } from '../../../../_service/_alert.service';
import { ModalComponent } from '../../../../_com/modal/modal.component';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-object-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(ModalComponent,{static:true}) modal:ModalComponent;

  @Input() object: any;
  @Input() config: any;
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

  ngOnInit() {
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
    });
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.object.fields, event.previousIndex, event.currentIndex);
    this.onFieldReorder(event);
  }

  onFieldReorder(event) {
    let _p = { "sort_fields":true,"from":event.previousIndex,"to":event.currentIndex,"object": JSON.stringify(this.object), "element": JSON.stringify(this) };
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
  _assignValues(){
    let _t = this;
    // reassign selected_obj here, because this method
    // if call by other as well, it will refresh values of seleccted obj
    this.config.config.infra.process.forEach((k)=>{
      if(k.name == _t.object.name){
        _t.object = k;
      }
    });
    // assign defaults or values from db
    this.object.fields.forEach(function (k) {
      //_t.el[k.name] = k.default_value;
    });
  }

  /**
   * 
   * @param f 
   */
  onClick_TryDelete(f){
    // this.editing_el = f;
    this.modal.show();
  }

  /**
   * 
   */
  onClick_DeleteField(){
    let _p = {"delete_field":true,"el":JSON.stringify(this),"process_el":JSON.stringify(this.object)};
    let _t = this;
    this.businessService.updateConfig(_p).subscribe(data=>{
      let temp:any;
      temp = data;
      _t._getBusiness();
    });
  }


}
