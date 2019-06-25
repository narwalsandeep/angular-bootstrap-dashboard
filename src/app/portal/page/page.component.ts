import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {infra}  from '../../../assets/infra';
import { BusinessService } from '../../_service/business.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  el = [];
  title = "";
  fields = [];
  _bool = [{ "value": true }, { "value": false }];

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) {
  }

  /**
   * 
   */
  ngOnInit() {
    this._getPage();
  }

  /**
   * 
   */
  _getPage() {
    let i = this.route.snapshot.paramMap.get("i");
    this.title = i.toUpperCase();
    let _t = this;
    let pl = infra.config.infra.process;
    this.fields = [];
    pl.forEach(function (v) {
      if (v.name == i) {
        _t.fields = v.fields;
      }
    });
    this._assignValues();
  }

  /**
   * 
   */
  _assignValues(){
    // assign defaults or values from db
    let _t = this;
    this.fields.forEach(function (k) {
      _t.el[k.name] = k.default_value;
    });
    
  }
  /**
   * 
   */
  onClick_Save() {
    
    this.businessService.createOrUpdate(this.el).subscribe(function(data){
      
    });
  }

}
