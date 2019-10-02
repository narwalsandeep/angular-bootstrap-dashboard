import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email = "";
  password = "";
  is_error = false;
  error_msg = "";

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onClick_Submit(){
    this.is_error = false;
    this.error_msg = "";
    if(this.validate()){
      let _p = {"email":this.email,"password":this.password};
      this.userService.create(_p).subscribe(data=>{

        let temp: any;
        temp = data;

        // below if response, you need to send json from server.
        console.log(temp);

      });
    }
  }

  validate(){
    let flag = true;
    if(this.email == ""){
      this.is_error = true;
      this.error_msg = "Email is required";
      flag = false;
    }
    if(this.password == ""){
      this.is_error = true;
      this.error_msg = "Password is required";
      flag = false;
    }
    return flag;
  }
}
