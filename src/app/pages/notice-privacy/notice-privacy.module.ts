import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticePrivacyRoutingModule } from './notice-privacy-routing.module';
import { NoticePrivacyComponent } from './notice-privacy.component';


@NgModule({
  declarations: [NoticePrivacyComponent],
  imports: [
    CommonModule,
    NoticePrivacyRoutingModule
  ]
})
export class NoticePrivacyModule { }
