import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-privacy',
  templateUrl: './notice-privacy.component.html',
  styleUrls: ['./notice-privacy.component.scss']
})
export class NoticePrivacyComponent implements OnInit {
  host: string;

  constructor() {
    this.host = `${window.location.origin}/`;
   }

  ngOnInit(): void {
  }

}
