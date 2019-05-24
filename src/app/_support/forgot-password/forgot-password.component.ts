import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_service/_alert.service';
import { SupportService } from '../../_service/support.service';
import { UrlHelper } from '../../_helper/url';
import { LocaleHelper } from '../../_helper/locale';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email = "";
  public is_instructions_sent = false;

  /**
   * 
   * @param alertService 
   * @param supportService 
   */
  constructor(
    private alertService: AlertService,
    private url: UrlHelper,
    private translate: TranslateService,
    private locale: LocaleHelper,
    private supportService: SupportService
  ) { }

  /**
   * 
   * @param lang 
   */
  onClick_ChangeLanguage(lang) {
    this.locale.setLocale(lang);
    this.translate.use(lang);
  }


  ngOnInit() {
    this.translate.use(this.locale.getLocale());
  }

  /**
   * 
   */
  onSubmit(){
    let valid = this._validate();
    if(valid == true){
      let _p = {
        "email":this.email,
        "domain":this.url.getDomainName()
      }
      this.supportService.forgotPassord(_p).subscribe(data=>{
        let temp:any;
        temp = data;
        if(temp.success == true){
          this.alertService.success(temp.msg);
          this.is_instructions_sent = true;
          this.email = "";
        }
        else{
          this.alertService.success(temp.msg);
        }
      });
    }
  }

  /**
   * 
   */
  _validate(){
    if(this.email.trim() == ""){
      this.alertService.error("Please enter a valid Email");
      return false;
    }
    return true;
  }

}
