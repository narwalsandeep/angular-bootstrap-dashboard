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

  
  default = { "readonly":"false","size":"col-6","required": false, "maxlength": 120, "name": "", "label": "", "default_value": "", "placeholder": "", "type": "text" };
  el: any;
  @Input() config: any;
  @Input() editing_el: any;
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
    if (this.editing_el != undefined) {
      this.el = this.editing_el;
      this.is_edit_mode = true;
    }
  }

  _reset() {
    this.el = this.default;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['editing_el'] != undefined){
      if(changes['editing_el'].currentValue != undefined)
        this.editing_el = changes['editing_el'].currentValue;
    }
    if (changes['config'] != undefined){
      if(changes['config'].currentValue != undefined)
        this.config = changes['config'].currentValue;
    }
    if (this.editing_el == undefined){
      this._reset();
    }
    else{
      this.el = this.editing_el;
    }

  }


  onClick_Submit() {
    if(this._validate()){
      let _p = { "edit": this.is_edit_mode, "inject_into_fields":true, "inject_into_el": "fields", "process_el": JSON.stringify(this.config), "el": JSON.stringify(this.el) };
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

  _validate(){
    if(this.el.name == ""){
      this._alert.error("Name cannot be empty");
      return false;
    }
    if(this.el.label == ""){
      this._alert.error("Label cannot be empty");
      return false;
    }
    return true;
  }
}
