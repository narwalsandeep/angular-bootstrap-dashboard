import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../_service/business.service';
import { AlertService } from '../../../_service/_alert.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  el = {"required":false,"maxlength":120,"name":"currency","label":"Currency","default_value":"","placeholder":"Please enter ","type":"text"};

  @Input() config: any;
  @Input() editing_el: any;
  is_edit_mode = false;

  constructor(
    private router: Router,
    private _alert: AlertService,
    private businessService: BusinessService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

  }

  ngOnInit() {
    if(this.editing_el != undefined){
      this.el = this.editing_el;
      this.is_edit_mode = true;
    }
  }

  onClick_Submit(){
    this.el.placeholder = "Enter "+this.el.label;
    let _p = { "edit":this.is_edit_mode, "inject_into_el":"fields","process_el":JSON.stringify(this.config),"el":JSON.stringify(this.el)};
    this.businessService.updateConfig(_p).subscribe(data=>{
      let temp:any;
      temp = data;
      if(temp.error){
        this._alert.error(temp.msg);
      }
      else{
        this._alert.success(temp.msg);
      }
    },
    error=>{
      this._alert.error("Server Error");
    });
  }
}
