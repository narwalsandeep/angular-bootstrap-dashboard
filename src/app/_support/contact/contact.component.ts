import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_service/_alert.service';
import { SupportService } from '../../_service/support.service';
import { AuthHelper } from '../../_helper/auth';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  is_company = true;
  company = "";
  full_name = "";
  mobile = "";
  email = "";
  query = "";
  is_loggedin = false;

  constructor(
    private supportService: SupportService,
    private auth:AuthHelper,
    private alertService: AlertService,
  ) { 
    
      if(auth.isLoggedIn()){
        this.is_loggedin = true;
        var _u = this.auth.getUser();
        console.log(_u);
        this.company = _u.business.name;
        this.full_name = _u.first_name+" "+_u.last_name;
        this.mobile = _u.mobile;
        this.email = _u.email;
      }
    }

  ngOnInit() {
  }

  onSubmit(){
    let valid = this._validate();
    if(valid == true){
      let _p = {
        "company":this.company,
        "full_name":this.full_name,
        "mobile":this.mobile,
        "email":this.email,
        "query":this.query
      }
      this.supportService.contact(_p).subscribe(data=>{
        let temp:any;
        temp = data;
        if(temp.success == true){
          this.alertService.success(temp.msg);
        }
        else{
          this.alertService.error(temp.msg);
        }
      });
    }
  }

  /**
   * validate the inputs
   */
  _validate(){
    let flag = true;
    if(this.email.trim() == ""){
      this.alertService.error("Email is required");
      flag = false;
    }
    if(this.full_name.trim() == ""){
      this.alertService.error("Full Name is required");
      flag = false;
    }
    if(this.mobile.trim() == ""){
      this.alertService.error("Mobile is required");
      flag = false;
    }
    if(this.query.trim() == ""){
      this.alertService.error("Query is required");
      flag = false;
    }

    return flag;
  }
}
