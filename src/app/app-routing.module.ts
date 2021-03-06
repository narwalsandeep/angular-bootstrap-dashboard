import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guard/auth.guard';
import { MasterComponent } from './_layout/master/master.component';
import { PortalComponent } from './_layout/portal/portal.component';
import { CmsComponent as CmsLayoutComponent } from './_layout/cms/cms.component';
import { SigninComponent as SigninLayoutComponent } from './_layout/signin/signin.component';

import { MainComponent as PortalDashboardMainComponent } from './portal/dashboard/main/main.component';
import { SecurityComponent as PortalSecurityComponent } from './portal/security/security.component';
import { SettingsComponent as PortalSettingsComponent } from './portal/settings/settings.component';
import { UserComponent as PortalUserComponent } from './portal/user/user.component';
import { ConfigComponent as PortalConfigComponent } from './portal/config/config.component';

import { PageComponent as PortalPageComponent } from './portal/page/page.component';

import { BusinessComponent as SuBusinessComponent } from './su/business/business.component';
import { UserComponent as SuUserComponent } from './su/user/user.component';
import { SettingsComponent as SuSettingComponent } from './su/settings/settings.component';
import { SecurityComponent as SuSecurityComponent } from './su/security/security.component';

import { SignoutComponent } from './auth/signout/signout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CmsComponent } from './cms/cms.component';

const routes: Routes = [
  {
    path: "auth",
    component: SigninLayoutComponent,
    children:[
      {
        path: "signin",
        component: SigninComponent
      },
      {
        path: "signout",
        component: SignoutComponent
      }
    ]
  },
  {
    path:"",
    component: CmsLayoutComponent,
    children:[
      {
        path:"",
        component:CmsComponent
      }
    ]
  },
  {
    path: "portal",
    component: PortalComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: "dashboard",
        component: PortalDashboardMainComponent
      },
      {
        path: "page",
        component: PortalPageComponent
      },
      {
        path: "config",
        component: PortalConfigComponent
      },
      {
        path: "user",
        component: PortalUserComponent
      },
      {
        path: "security",
        component: PortalSecurityComponent
      },
      {
        path: "settings",
        component: PortalSettingsComponent
      }

    ]
  },
  // su routing below
  {
    path: "su",
    component: MasterComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: "business",
        component: SuBusinessComponent
      },
      {
        path: "user",
        component: SuUserComponent
      },
      {
        path: "settings",
        component: SuSettingComponent
      },
      {
        path: "security",
        component: SuSecurityComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true,onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
