import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_service/_alert.service';
import { UserService } from '../../_service/user.service';
import { AuthHelper } from '../../_helper/auth';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  title = "CHANGE PASSWORD";
  is_loading = false;
  password = "";
  confirm_password = "";

  /**
   * 
   */
  constructor(
    private alertService: AlertService,
    private authHelper: AuthHelper,
    private userService: UserService

  ) { }

  /**
   * 
   */
  ngOnInit() {
  }

  /**
   * 
   */
  onClick_Save(){
    if(!this._validate()){
      return false;
    }
    this.is_loading = true;
    let _p = {"password":this.password,"id":this.authHelper.getUser().user_id};
    this.userService.createOrUpdate(_p).subscribe(data=>{
      this.is_loading = false;
      let temp:any;
      temp = data;
      if(temp.success){
        this.alertService.success(temp.msg);
      }
      else{
        this.alertService.error(temp.msg);
      }
    },
    error => {
      this.is_loading = false;
      this.alertService.error("Server Error");
    });

  }

  /**
   * 
   */
  _validate(){
    let flag = true;
    if(this.password == ""){
      flag = false;
      this.alertService.error("Password cannot be blank");
    }
    if(this.password != this.confirm_password){
      this.alertService.error("Password does not match Confirm Password");
      flag = false
    }
    return flag;
  }
}
