import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../_service/business.service';
import { AlertService } from '../../../_service/_alert.service';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {


  default = { "readonly": "false", "size": "col-6", "required": false, "maxlength": 120, "name": "", "label": "", "default_value": "", "placeholder": "", "type": "text" };
  @Input() object: any;
  @Input() element: any;
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
    if (changes['element'] != undefined) {
      if (changes['element'].currentValue != undefined) {
        this.element = changes['element'].currentValue;
        this.is_editing = true;
      }
      else {
        this.element = this.default;
      }
    }
    console.log(this.element);
  }


  onClick_Submit() {
    if (this._validate()) {
      let _p = { "edit": this.is_editing, "inject_into_fields": true, "object": JSON.stringify(this.object), "element": JSON.stringify(this.element) };
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
    if (this.element.name == "") {
      this._alert.error("Name cannot be empty");
      return false;
    }
    if (this.element.label == "") {
      this._alert.error("Label cannot be empty");
      return false;
    }
    return true;
  }
}
