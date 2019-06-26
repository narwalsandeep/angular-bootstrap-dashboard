import { Component, OnInit,ViewChild} from '@angular/core';
import { UserService as ThisEntity } from '../../_service/user.service';
import { BusinessService } from '../../_service/business.service';
import { AlertService } from '../../_service/_alert.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthHelper } from '../../_helper/auth';
import { ParamsHelper } from '../../_helper/params';
import { ModalComponent } from '../../_com/modal/modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(ModalComponent,{static: false}) modal:ModalComponent;

  is_on_new = false;
  is_on_list = false;
  is_edit = false;
  is_loading = false;
  edit_id = 0;
  action_name = "";
  sub_title = "";
  is_device_assigned = false;
  devices:any;
  active_device_count = 0;
  all_patients:any;

  count = 0;
  entity_name = "USER";
  entity = {
    "id":0, "user_type":"attendant",
    "business_id":0,"device_id":0,
    "device_name":"",
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
      username: {
        title: "Email"
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
  settings_patient = {
    attr: {
      class: 'table table-bordered'
    },
    actions: false,
    columns: {
      username: {
        title: "Email"
      },
      device_name: {
        title: "Device"
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
    private paramsHelper: ParamsHelper,
    private authHelper: AuthHelper,
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

  /**
   * 
   */
  ngOnInit() {
  }

  /**
   * 
   */
  _reset() {
    this.is_on_new = false;
    this.is_on_list = false;
    this.is_edit = false;
    this.is_device_assigned = false;
    this.edit_id = 0;
    this.entity_name = this.route.snapshot.paramMap.get("user_type").toUpperCase();
    this.action_name = "";
    this.entity = {
      "id":0, "user_type":"attendant",
      "device_id":0,
      "device_name":"",
      "business_id":this.authHelper.getUser().business.id,
      "username": "", "password": "","confirm_password":"",
      "first_name": "","last_name":"",
      "phone": "", "status":"active"
      };
    this.entity.user_type = this.route.snapshot.paramMap.get("user_type");
    if(this.entity.user_type == 'patient'){
      this.settings = this.settings_patient;
    }
    
    this.entity.business_id = this.authHelper.getUser().business.id;

  }

  /**
   * 
   */
  readAll() {
    let _t = this;
    this.is_loading = true;
    this._readAll(this.entity);
  }

  /**
   * 
   */
  readAllPatient(e){
    let _t = this;
    this.is_loading = true;
    this._readAll(e);

  }


  /**
   * 
   * @param _p 
   */
  _readAll(e){
    let _t = this;
    
    this.entityService.readAll(e).subscribe(data => {
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

    if(this.entity_name == 'ATTENDANT'){
      this.entity.user_type = "PATIENT"
      this.readAllPatient(this.entity);
      this.entity.user_type = this.route.snapshot.paramMap.get("user_type");
    }
    

    this.entityService.read(_p).subscribe(data => {
      let temp :any;
      temp = data;
      this.entity = temp.payload;
      this.is_device_assigned = false;
      if(this.entity.device_id > 0){
        this.is_device_assigned = true;
      }
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
  onClick_Assign(){
    this.alertService.error("Under construction ...");
  }

  /**
   * 
   */
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
    this.entity.user_type = this.route.snapshot.paramMap.get("user_type");
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
  onClick_AttachDevice(){
    if(this.entity.device_id > 0){
      this.entityService.attachDevice(this.entity).subscribe(data=>{
        let temp:any;
        temp = data;
        if(temp.success){
          this.alertService.success(temp.msg);
          this.entity.device_name = temp.payload.name;
          this.is_device_assigned = true;
        }
        else{
          this.alertService.error(temp.msg);
        }
      },
      error=>{
        this.alertService.error("Server Error");
      });
    }
    else{
      this.alertService.error("Invalid device selected");
    }
  }

  /**
   * 
   */
  onClick_EjectDevice(){
    if(this.entity.device_id > 0){
      this.entityService.ejectDevice(this.entity).subscribe(data=>{
        let temp: any;
        temp = data;
        if(temp.success){
          this.alertService.success(temp.msg);
          this.is_device_assigned = false;
        }else{
          this.alertService.error(temp.msg);
        }
      },
      error=>{
        this.alertService.error("Server Error");
      });
    }
    else{
      this.alertService.error("Invalid device attached");
    }
  }

  /**
   * 
   */
  onClick_ConfigureTriggers(){
    this.alertService.error("Under construction ...");
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
