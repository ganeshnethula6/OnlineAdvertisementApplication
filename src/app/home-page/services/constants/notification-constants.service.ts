import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationConstantsService {
USER_REGISTER_ALREADY_EXISTS="Please try with new Email Id..";
USER_DOESNT_EXISTS="please try again.."
DELETE_EXISTING_USER="Are you sure?\n If you click on  'YES' this record no longer exists.\n Choosse your option";
UPDATE_EXISTING_USER="Updating the user is not avaliable for Admin \n Click any button to exist.";
LOGOUT_USER_ACCOUNT="Are you sure you want to log out ?  Click on yes.."
constructor() { }
}
