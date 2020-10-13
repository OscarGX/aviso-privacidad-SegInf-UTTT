import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticePrivacyComponent } from './notice-privacy.component';

const routes: Routes = [
  { path: '', component: NoticePrivacyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticePrivacyRoutingModule { }
