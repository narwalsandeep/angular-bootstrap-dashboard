import { Component, OnInit, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../_service/business.service';
import { AlertService } from '../../../_service/_alert.service';
import { ModalComponent } from '../../../_com/modal/modal.component';

@Component({
  selector: 'app-master-object-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

  @Output() refreshConfig = new EventEmitter<boolean>();
  default = { "icon":"","parent":"","label":"","name": "", "status": "Active","type": "form" };
  @Input() object: any;
  is_editing = false;

  constructor(
    private router: Router,
    private _alert: AlertService,
    private businessService: BusinessService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['object'] != undefined) {
      if (changes['object'].currentValue != undefined){
        this.object = changes['object'].currentValue;
        this.is_editing = true;
      }
      else{
        this.object = this.default;
      }
    }
  }

  onClick_Submit() {
    if (this._validate()) {
      let _p = { "edit": this.is_editing, "inject_into_object": true, "object": JSON.stringify(this.object) };
      this.businessService.updateConfig(_p).subscribe(data => {
        let temp: any;
        temp = data;
        if (temp.error) {
          this._alert.error(temp.msg);
        }
        else {
          this._alert.success(temp.msg);
        }
        this.refreshConfig.emit(true);
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
      this.refreshConfig.emit(true);

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
