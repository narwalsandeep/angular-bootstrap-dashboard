import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './_layout/master/master.component';
import { SigninComponent as SigninLayoutComponent } from './_layout/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

import { AuthService } from './_service/auth.service';
import { AuthGuard } from './_guard/auth.guard';
import { AlertService } from './_service/_alert.service';
import { UserService } from './_service/user.service';

import {NgxMaskModule} from 'ngx-mask';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AlertComponent } from './_directive/alert/alert.component';
import { NotifierModule ,NotifierOptions } from 'angular-notifier';

import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ErrorInterceptor } from './_helper/error.interceptor';
import { UrlHelper } from './_helper/url';
import { ParamsHelper } from './_helper/params';
import { StringHelper } from './_helper/string';
import { AuthHelper } from './_helper/auth';
import { LocaleHelper } from './_helper/locale';
import { FileHelper } from './_helper/file';
import { CalendarHelper } from './_helper/calendar';
import { HttpFormEncodingCodec } from './_helper/http.form.codec';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { PageNotFoundComponent } from './_support/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './_support/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './_support/forgot-password/forgot-password.component';

import { environment } from '../environments/environment';
import { AboutComponent } from './_support/about/about.component';
import { TncComponent } from './_support/tnc/tnc.component';
import { PrivacyComponent } from './_support/privacy/privacy.component';
import { FaqsComponent } from './_support/faqs/faqs.component';
import { ContactComponent } from './_support/contact/contact.component';

import { BusinessComponent as SuBusinessComponent } from './su/business/business.component';
import { SettingsComponent as SuSettingsComponent } from './su/settings/settings.component';
import {  SecurityComponent as SuSecurityComponent } from './su/security/security.component';

import { MainComponent as PortalDashboardMainComponent } from './portal/dashboard/main/main.component';
import { SettingsComponent as PortalSettingsComponent } from './portal/settings/settings.component';
import { SecurityComponent as PortalSecurityComponent } from './portal/security/security.component';
import { UserComponent as PortalUserComponent } from './portal/user/user.component';
import { PortalComponent } from './_layout/portal/portal.component';
import { UserComponent as SuUserComponent } from './su/user/user.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SignoutComponent } from './auth/signout/signout.component';
import { ModalComponent as ComModalComponent } from './_com/modal/modal.component';
import { PageComponent as PortalPageComponent } from './portal/page/page.component';
import { ConfigComponent  as PortalConfigComponent} from './portal/config/config.component';
import { ElementComponent } from './portal/config/element/element.component';
import { OrderModule } from 'ngx-order-pipe';
import { TextboxComponent } from './master/element/textbox/textbox.component';
import { DropdownComponent } from './master/element/dropdown/dropdown.component';
import { TextareaComponent } from './master/element/textarea/textarea.component';
import { RadioComponent } from './master/element/radio/radio.component';
import { CheckboxComponent } from './master/element/checkbox/checkbox.component';
import { DateComponent } from './master/element/date/date.component';
import { TimeComponent } from './master/element/time/time.component';
import { EmailComponent } from './master/element/email/email.component';
import { FileComponent } from './master/element/file/file.component';
import { CurrencyComponent } from './master/element/currency/currency.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SeparatorComponent } from './master/element/separator/separator.component';
import { ObjectComponent as PortalConfigObjectComponent } from './portal/config/object/object.component';
import { FormComponent as MasterObjectFormComponent } from './master/object/form/form.component';
import { LayoutComponent as PortalConfigObjectLayoutComponent } from './portal/config/object/layout/layout.component';
import { SettingsComponent as PortalConfigObjectSettingsComponent } from './portal/config/object/settings/settings.component';
import { TriggersComponent as PortalConfigObjectTriggersComponent } from './portal/config/object/triggers/triggers.component';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 4
    },
    vertical: {
      position: 'top',
      distance: 4,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: "hide",
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    SigninLayoutComponent,
    SignupComponent,
    SigninComponent,
    PortalPageComponent,
    SigninLayoutComponent,
    AlertComponent,
    PageNotFoundComponent,
    AppComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AboutComponent,
    TncComponent,
    PrivacyComponent,
    FaqsComponent,
    ContactComponent,
    SuBusinessComponent,
    SuSettingsComponent,
    SuSecurityComponent,
    SuUserComponent,
    PortalDashboardMainComponent,
    PortalSecurityComponent,
    PortalSettingsComponent,
    PortalComponent,
    PortalUserComponent,
    SignoutComponent,
    ComModalComponent,
    PortalConfigComponent,
    ElementComponent,
    TextboxComponent,
    DropdownComponent,
    TextareaComponent,
    RadioComponent,
    CheckboxComponent,
    DateComponent,
    TimeComponent,
    EmailComponent,
    FileComponent,
    CurrencyComponent,
    SeparatorComponent,
    PortalConfigObjectComponent,
    MasterObjectFormComponent,
    PortalConfigObjectLayoutComponent,
    PortalConfigObjectSettingsComponent,
    PortalConfigObjectTriggersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OrderModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
    DragDropModule,
    AngularFontAwesomeModule,
    NgxMaskModule.forRoot(),    
    NgxSmartModalModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    CalendarHelper,
    AuthHelper,   
    UrlHelper,
    ParamsHelper,
    StringHelper,
    LocaleHelper,
    FileHelper,
    UserService,
    HttpFormEncodingCodec,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue: '/'}
    //{provide: APP_BASE_HREF,useValue: '/' + (window.location.pathname.split('/')[1] || '')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
