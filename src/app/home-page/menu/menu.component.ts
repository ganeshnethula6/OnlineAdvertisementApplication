import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { MenuDialogComponent } from '../dialog/menu-dialog/menu-dialog.component';
import { RegistrationDialogComponent } from '../dialog/registration-dialog/registration-dialog.component';
import { UserRegistrationModel } from '../models/user-registration.model';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { ApplicationConstantsService } from '../services/constants/application-constants.service';
import { NotificationConstantsService } from '../services/constants/notification-constants.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userDetails!: UserRegistrationModel[];
  menuItem!: string;
  constructor(private dialog:MatDialog,
    private applicationConstans:ApplicationConstantsService,
    private notifications:NotificationConstantsService,
    private auth:AuthenticationServiceService,
    private router:Router,
    private authService:AuthenticationServiceService) { }
  footer_msg=this.applicationConstans.HOME_FOOTER_MSG;
  user:UserRegistrationModel[]=this.auth.user;
  userModel=this.user;
  no_user!:boolean;
  _user:boolean=true;
  ngOnInit(): void {
    //this.no_user=false;
    this.userDetails = this.authService.user;
    if(this.userDetails)
    {
      this._user= !this._user;
    }
    else{
      this._user= !this._user;
    }
    // this.no_user=true;
    // this._user=true;
  }
roleType=this.auth.roleType;
logOut()
{
  let logoutDialogRef=this.dialog.open(AlertDialogComponent,{
    height:"220px",
    width:"600px",
    data:
    {
    logOutMsg:this.notifications.LOGOUT_USER_ACCOUNT,
    }
  });
logoutDialogRef.afterClosed().subscribe(
  data=>
  {
    if(data=0)
    {
      this._user= !this._user;
      this.router.navigate(['/home']);
    }
    this.router.navigate(['/home']);
    // this.no_user=true;

    // this._user=false;
  }
)
}
openSignIn()
{
  let loginDialogRef=this.dialog.open(LoginDialogComponent,
    {
      height:"350px",
      width:"400px"
    })
}

openSignUp()
{
  let registerDialogRef=this.dialog.open(RegistrationDialogComponent,
    {
      height:"700px",
      width:"600px",
      data:{
roleName:"viewer"
      }
    });
    registerDialogRef.afterClosed().subscribe(
      data=>
      {

      }
    )
}


openMenu(item:any)
{
  if(item==0)
  {
this.menuItem='c';
  }
  else if(item==1)
  {
    this.menuItem='s';
  }
  else if(item==2)
  {
    this.menuItem='a';
  }
  let openMenuDialogRef=this.dialog.open(MenuDialogComponent,
    {
      height:"400px",
      width:"400px",
      data:
      {
      itemS:this.menuItem
      }
    });
    openMenuDialogRef.afterClosed().subscribe(
      data=>
      {

      }
    )

}
}
