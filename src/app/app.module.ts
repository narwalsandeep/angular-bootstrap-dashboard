import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserService } from './_service/user.service';


import { JwtInterceptor } from './_helper/jwt.interceptor';
import { UrlHelper } from './_helper/url';
import { ParamsHelper } from './_helper/params';
import { HttpFormEncodingCodec } from './_helper/http.form.codec';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';

import { PortalComponent } from './_layout/portal/portal.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomeComponent } from './portal/home/home.component';
import { PlayerComponent } from './portal/player/player.component';
import { TeamComponent } from './portal/team/team.component';


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    PortalComponent,
    HomeComponent,
    PlayerComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    UrlHelper,
    ParamsHelper,
    UserService,
    HttpFormEncodingCodec,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue: '/'}
    //{provide: APP_BASE_HREF,useValue: '/' + (window.location.pathname.split('/')[1] || '')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
