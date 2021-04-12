import { Component } from '@angular/core';
import { ApplicationConstantsService } from './home-page/services/constants/application-constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineAdvertisementSystem';
  constructor(private applicationConstans:ApplicationConstantsService)
  {

  }
  footer_msg=this.applicationConstans.HOME_FOOTER_MSG;
}
