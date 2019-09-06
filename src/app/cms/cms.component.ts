import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../_service/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  business: any;
  config: any;
  active_menu = {"label":"","html":""};
  menu = [];
  home_page = {"label":"","html":""};
  constructor(
    private router: Router,
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.businessService.read({ "id": 2 }).subscribe(data => {
      let temp: any;
      temp = data;
      this.business = temp.payload;
      this._setConfig();
      this._setMenu();
    });
  }

  _setConfig() {
    this.config = JSON.parse(this.business.config);
    console.log(this.config);
  }

  _setMenu() {
    this.config.config.infra.object.forEach(k => {
      if (k.type == 'static' && k.status == 'Active') {
        this.menu.push(k);
        if(k.home == 'Yes'){
          this.home_page = k;
        }
      }
    });
  }

  onClick_MainMenu(m) {
    this.router.navigateByUrl("?_="+m.name);
    this.active_menu = m;
  }

  onClick_Home(){
    this.active_menu = this.home_page;

  }
}
