import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './_layout/portal/portal.component';
import { HomeComponent } from './portal/home/home.component';
import { PlayerComponent } from './portal/player/player.component';
import { TeamComponent } from './portal/team/team.component';


const routes: Routes = [
  {
    path: "",
    component: PortalComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "player",
        component: PlayerComponent
      },
      {
        path: "team",
        component: TeamComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
