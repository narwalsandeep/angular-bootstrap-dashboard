import { Component, OnInit,ViewChild } from '@angular/core';
import { BusinessService as ThisEntity } from '../../_service/business.service';
import { AlertService } from '../../_service/_alert.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ParamsHelper } from '../../_helper/params';
import { ModalComponent } from '../../_com/modal/modal.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  @ViewChild(ModalComponent) modal:ModalComponent;

  is_on_new = false;
  is_on_list = false;
  is_edit = false;
  is_loading = false;
  edit_id = 0;
  action_name = "";  
  count = 0;
  entity_name = "BUSINESS";
  entity = {
    "id":0,
    "username": "", "password": "",
    "name": "", "description": "",
    "address_number": "", "address_street": "", "address_city": "", "address_state": "", "address_zip": "", "address_country": "",
    "email": "", "phone": "", "status":"active"
  };

  status = [{ "value": "active" }, { "value": "inactive" }];


  entity_recordset: any;
  settings = {
    attr: {
      class: 'table table-bordered'
    },
    actions: false,
    columns: {
      name: {
        title: "Name"
      },
      phone: {
        title: "Phone"
      },
      email: {
        title: "Email"
      },
      status:{
        title: "Status"
      }
    }
  };


  constructor(
    private router: Router,
    private paramsHelper: ParamsHelper,
    private alertService: AlertService,
    private entityService: ThisEntity
  ) {


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this._reset();
    this.readAll();
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
      "id":0,
      "username": "", "password": "",
      "name": "", "description": "",
      "address_number": "", "address_street": "", "address_city": "", "address_state": "", "address_zip": "", "address_country": "",
      "email": "", "phone": "","status":"active"
    };

  }

  /**
   * 
   */
  readAll() {
    let _t = this;
    this.is_loading = true;
    this.entityService.readAll().subscribe(data => {
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
  onClick_NewRecord() {
    this._reset();
    this.action_name = "ADD";
    this.is_on_new = true;
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

  onClick_TryDelete(){
    this.modal.show();
  }
  /**
   * 
   */
  onClick_Delete() {
    this.is_loading = true;
    if(this.is_edit && this.edit_id > 0){
      let _p = {"id":this.edit_id};
      this.entityService.delete(_p).subscribe(data=>{
        let temp: any;
        temp = data;
        if(temp.success){
          this.edit_id = 0;
          this._reset();
          this.is_on_list = true;
          this.readAll();
          this.is_loading = false;
          this.alertService.success(temp.msg);
        }else{
          this.alertService.error(temp.msg);  
        }
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
    this.entityService.create(this.entity).subscribe(data => {
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
    if (this.entity.name == "") {
      flag = false;
      this.alertService.error("Please specify User name");
    }
    if (this.entity.email == "") {
      flag = false;
      this.alertService.error("Please specify User email");
    }
    if (this.entity.username == "") {
      flag = false;
      this.alertService.error("Please specify Admin Username");
    }
    if (this.entity.password == "") {
      flag = false;
      this.alertService.error("Please specify Admin Password");
    }

    return flag;
  }
}
