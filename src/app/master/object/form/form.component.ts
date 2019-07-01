import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../_service/business.service';
import { AlertService } from '../../../_service/_alert.service';

@Component({
  selector: 'app-master-object-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  default = { "icon":"","parent":"","label":"","name": "", "status": "Active","type": "form" };
  @Input() object: any;
  is_editing_object = false;

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
        this.is_editing_object = true;
      }
      else{
        this.object = this.default;
      }
    }
  }

  onClick_Submit() {
    if (this._validate()) {
      let _p = { "edit": this.is_editing_object, "inject_into_object": true, "object": JSON.stringify(this.object) };
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
