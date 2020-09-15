import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberDashboardComponent} from './member-dashboard/member-dashboard.component';
import {MemberClassesComponent} from './member-classes/member-classes.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MemberDashboardComponent
  },
  {
    path: 'classes',
    component: MemberClassesComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
