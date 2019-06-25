
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/auth.service';
import { AuthHelper } from '../../_helper/auth';
import { AlertService } from '../../_service/_alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username = "";
  password = "";
  constructor(
    private router: Router,
    private alertService: AlertService,
    private authHelper: AuthHelper,
    private authService:AuthService
  ) { 
  }

  ngOnInit() {
  }

  onClick_Signin(){
    let _p = {"username":this.username,"password":this.password};
    this.authService.signin(_p).subscribe(data => {
      let temp: any;
      temp = data;
      if(temp.success){
        if(temp.payload.user_type == 'su'){
          this.router.navigateByUrl("/su/business");       
        }
        else{
          this.router.navigateByUrl("/portal/dashboard");      
        }
      }
      else{
        this.alertService.error(temp.msg);
      }
    },
    error=>{
      this.alertService.error("Server Error");
    });

  }

}
