import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../_service/business.service';
import { AlertService } from '../../../_service/_alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  default = { "name": "", "status": "Active", "parent":"","type": "form" };
  menu: any;
  @Input() editing_menu: any;
  is_edit_mode = false;

  constructor(
    private router: Router,
    private _alert: AlertService,
    private businessService: BusinessService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    this._reset();
  }

  ngOnInit() {
    if (this.editing_menu != undefined) {
      this.menu = this.editing_menu;
      this.is_edit_mode = true;
    }
  }

  _reset() {
    this.menu = this.default;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editing_menu'] != undefined) {
      if (changes['editing_menu'].currentValue != undefined)
        this.editing_menu = changes['editing_menu'].currentValue;
    }
    if (this.editing_menu == undefined) {
      this._reset();
    }
    else {
      this.menu = this.editing_menu;
    }
  }

  onClick_Submit() {
    if (this._validate()) {
      let _p = { "edit": this.is_edit_mode, "inject_into_el": "process", "el": JSON.stringify(this.menu) };
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
    if (this.menu.label == "") {
      this._alert.error("Label cannot be empty");
      return false;
    }
    return true;
  }
}
