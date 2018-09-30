import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting/setting.component';
import { FeedComponent } from './feed/feed.component';
import { AppGuardGuard } from './app-guard.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    canActivate: [AppGuardGuard],
    pathMatch: 'full'    
  },
  {
    path: 'settings',
    component: SettingComponent,    
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
