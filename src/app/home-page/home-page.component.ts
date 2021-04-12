import { Component, OnInit } from '@angular/core';
import { ApplicationConstantsService } from './services/constants/application-constants.service';
import { NotificationConstantsService } from './services/constants/notification-constants.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private applicationConstans:ApplicationConstantsService) { }
  footer_msg=this.applicationConstans.HOME_FOOTER_MSG;
  header_title=this.applicationConstans.HOME_HEADER_TITLE;
  header_subtitle=this.applicationConstans.HOME_HEADER_SUBTITLE;

  ngOnInit(): void {
  }
}
