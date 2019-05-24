import { Component, OnInit } from '@angular/core';
import { UserService as ThisEntity } from '../../_service/user.service';
import { BusinessService } from '../../_service/business.service';
import { AlertService } from '../../_service/_alert.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ParamsHelper } from '../../_helper/params';
import { StringHelper } from '../../_helper/string';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  is_on_new = false;
  is_on_list = false;
  is_edit = false;
  is_loading = false;
  edit_id = 0;
  business_id = "";
  action_name = "";
  sub_title = "";

  count = 0;
  entity_name = "USER";
  entity = {
    "id":0,"user_type":"attendant",
    "business_id":0,
    "username": "", "password": "","confirm_password":"",
    "first_name": "","last_name":"",
    "phone": "", "status":"active"
  };

  status = [{ "value": "active" }, { "value": "inactive" }];
  businesses: any;

  entity_recordset: any;
  settings = {
    attr: {
      class: 'table table-bordered'
    },
    actions: false,
    columns: {
      business_name: {
        title: "Business"
      },
      username: {
        title: "Email"
      },
      user_type: {
        title: "Type"
      },
      first_name: {
        title: "First Name"
      },
      last_name:{
        title: "Last Name"
      },
      mobile: {
        title: "Mobile"
      },
      status:{
        title: "Status"
      }
    }
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private stringHelper: StringHelper,
    private paramsHelper: ParamsHelper,
    private alertService: AlertService,
    private entityService: ThisEntity
  ) {


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this._reset();
    this.readAll();
    this.readAllBusiness();
    this.is_on_list = true;
  }

  ngOnInit() {
  }

  /**
   * 
   */
  _reset() {
    this.is_on_new = false;
    this.is_on_list = false;
    this.is_edit = false;
    this.edit_id = 0;
    this.action_name = "";
    this.entity = {
      "id":0,"user_type":"attendant",
      "business_id":0,
      "username": "", "password": "","confirm_password":"",
      "first_name": "","last_name":"",
      "phone": "", "status":"active"
      };

  }

  /**
   * 
   */
  readAll() {
    let _t = this;
    this.is_loading = true;
    this.business_id = this.route.snapshot.paramMap.get("id");
    this._readBusiness();
    this._readAll();
  }

  /**
   * 
   * @param _p 
   */
  _readBusiness(){
    let _t = this;
    if(this.stringHelper.hasSomething(this.business_id)){
      let _p = {"id":this.business_id};
      this.businessService.read(_p).subscribe(data=>{
        let temp: any;
        temp = data;
        _t.sub_title = " FOR "+temp.payload.name.toUpperCase();
      });
    }
  }

  /**
   * 
   * @param _p 
   */
  _readAll(){
    let _t = this;
    let _p = {"buiness_id":this.business_id};
    this.entityService.readAll(_p).subscribe(data => {
      let temp:any;
      temp = data;
      this.is_loading = false;
      _t.entity_recordset = temp.payload;
      _t.count = temp.count;
    },
    error=>{
      this.is_loading = false;
      this.alertService.error("Server Error");
    });

  }


  /**
   * 
   */
  readAllBusiness() {
    let _t = this;
    this.is_loading = true;
    this.businessService.readAll().subscribe(data => {
      let temp:any;
      temp = data;
      this.is_loading = false;
      _t.businesses = temp.payload;
    },
    error=>{
      this.is_loading = false;
      this.alertService.error("Server Error");
    });
  }


  /**
   * 
   */
  onClick_NewRecord() {
    this._reset();
    this.is_on_new = true;
    this.action_name = "ADD";
  }

  /**
   * 
   * @param e 
   */
  onClick_Record(e){
    this._reset();
    this.is_edit = true;
    this.action_name = "EDIT";
    this.is_on_new = true;
    this.edit_id = e.data.id;
    let _p = {"id":this.edit_id};

    this.entityService.read(_p).subscribe(data => {
      let temp :any;
      temp = data;
      this.entity = temp.payload;
    },
    error =>{
      this.alertService.error("Server Error");
      this.is_loading = false;
    });
  }

  /**
   * 
   */
  onClick_PrimarySubmit() {
    if (!this._validate()) {
      return false;
    }
    this._create();
  }

  /**
   * 
   */
  onClick_Delete() {
    this.is_loading = true;
    if(this.is_edit && this.edit_id > 0){
      let _p = {"id":this.edit_id};
      this.entityService.delete(_p).subscribe(data=>{
        this.edit_id = 0;
        this._reset();
        this.is_on_list = true;
        this.readAll();
        this.is_loading = false;
      },
      error => {
        this.alertService.error("Server Error");
        this.is_loading = false;
      });
    }
  }

  /**
   * 
   */
  _create(){
    this.is_loading = true;
    if(this.edit_id > 0 && this.is_edit){
      this.entity.id = this.edit_id;
    }
    this.entityService.createOrUpdate(this.entity).subscribe(data => {
      let temp: any;
      temp = data;
      if (temp.success) {
        this.alertService.success(temp.msg);
        this._reset();
        this.is_on_list = true;
        this.readAll();
        this.is_loading = false;

      }
      else {
        this.alertService.error(temp.msg);
      }
    },
    error => {
      this.alertService.error("Server Error");
      this.is_loading = false;
    });
  }


  /**
   * 
   */
  _validate() {
    let flag = true;
    if (this.entity.username == "") {
      flag = false;
      this.alertService.error("Please specify Username");
    }
    if (this.entity.first_name == "") {
      flag = false;
      this.alertService.error("Please specify First Name");
    }
    if (this.entity.last_name == "") {
      flag = false;
      this.alertService.error("Please specify Last Name");
    }
    if (this.entity.password == "") {
      flag = false;
      this.alertService.error("Please specify Password");
    }
    if (this.entity.confirm_password != this.entity.password) {
      flag = false;
      this.alertService.error("Confirm Password does not match");
    }

    return flag;
  }
}
