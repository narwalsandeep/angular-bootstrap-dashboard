import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_service/_alert.service';
import { SupportService } from '../../_service/support.service';
import { AuthHelper } from '../../_helper/auth';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public password = "";
  public confirm_password = "";
  public is_instructions_sent = false;
  public url_x = "";
  public is_reset_done = false;
  public err = false;
  public is_911 = false;
  public is_loading = false;
  /**
   * 
   * @param alertService 
   * @param supportService 
   */
  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private auth: AuthHelper,
    private router: Router,
    private supportService: SupportService
  ) { 

    this.route.queryParams.subscribe(params => {

      if (params['x'] != "" && params['x'] != undefined) {
        if(params['c'] == 911){
          this.is_911 = true;
        }  
        this.url_x = params['x'];
      }
      else{
        this.router.navigate(['/page-not-found']);
      }
    });
  }

  ngOnInit() {
  }

  /**
   * 
   */
  onSubmit(){
    let valid = this._validate();
    if(valid == true){
      let _p = {
        "password":this.password,
        "token":this.url_x
      }
      this.is_loading = true;
      this.supportService.resetPassword(_p).subscribe(data=>{
        this.is_loading = false;
        let temp:any;
        temp = data;
        if(temp.success == true){
          this.alertService.success(temp.msg);
          this.is_reset_done = true;
          this.password = "";
          // if was force to reset send user to dashboard directly
          var user = this.auth.getUser();
          if(user.is_force_reset_password){
            user.is_force_reset_password = 0;
            this.auth.setUser(user);
            this.router.navigate(['/']);
          }
        }
        else{
          this.alertService.error(temp.msg);
        }
      });
    }
  }

  /**
   * 
   */
  _validate(){
    if(this.password.trim() == "" || this.password.length < 8){
      this.alertService.error("Please enter a valid Password, min 8 char, no spaces");
      return false;
    }
    if(this.confirm_password.trim() != this.password.trim()){
      this.alertService.error("Password must match Confirm Password");
      return false;
    }
    
    return true;
  }

}
