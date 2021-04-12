import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  model=new UserRegistrationModel;
  userDoesntExists!:string;

  constructor(private dialog:MatDialog,
    private loginDialogRef:MatDialogRef<LoginDialogComponent>,
    private fb:FormBuilder,
    private authService:AuthenticationServiceService,
    private router:Router) { }

  ngOnInit(): void {
  }
  userLoginForm = this.fb.group(
    {
      emailId: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
    get emailId() {
      return this.userLoginForm.get('emailId');
    }
    get password() {
      return this.userLoginForm.get('password');
    }
    onSubmit()
    {
      this.loginDialogRef.close(0);
      this.authService.login(this.model).subscribe
      (
        data=>
        {
         let dialogRef=this.dialog.open(AlertDialogComponent,{
            height:"200px",
            width:"500px",
            data:
            {
             loginSuccessMsg:"Hi! "+data.firstName+" your "+data.roleType+" account is successfully login..."
            }
          });
          dialogRef.afterClosed().subscribe(
            result=>
            {

              if(data.roleType=="viewer")
              {
                this.router.navigate(["/user-dashboard"]);
                this.authService.roleType="viewer";
                this.authService.user=data;
              }
              else if(data.roleType=="client")
              {
                this.router.navigate(["/client-dashboard"]);
                this.authService.roleType="client";
                this.authService.user=data;

              }

              else if(data.roleType=="admin"){
                this.router.navigate(["/admin-dashboard"]);
                this.authService.roleType="admin";
                this.authService.user=data;

              }
              else{
                this.router.navigate(["/sign-in"]);
                this.authService.roleType="";

              }

             });
        },
        error=>
        {

          console.log(error.error.message);
    if(error.error.message!=null)
    {
      this.userDoesntExists= error.error.message;
      let dialogRef=this.dialog.open(AlertDialogComponent,{
        height:"200px",
        width:"500px",
        data:
        {
          loginErrorMsg:this.userDoesntExists
        }
      });
      dialogRef.afterClosed().subscribe(
        data=>
        {
          this.router.navigate(["/sign-in"]);
        }
      );
    }


        }


      )
  }
    newRegister()
    {
     // this.router.navigate(['/signup']);
      this.loginDialogRef.close(0);
let registerDialogref=this.dialog.open(RegistrationDialogComponent,{
  height: '700px',
  width: '600px',
  data:
  {

  }
})

    }
}
