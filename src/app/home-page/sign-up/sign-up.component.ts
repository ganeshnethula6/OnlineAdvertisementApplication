import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { UserRegistrationModel } from '../models/user-registration.model';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { NotificationConstantsService } from '../services/constants/notification-constants.service';
export interface RoleType{
  roleName:string;
  roleValue:string;

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const invalidParent = !!(control && control.parent && control.parent.invalid);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public model: UserRegistrationModel = new UserRegistrationModel;
  confirmpsw!:string;
  matcher = new MyErrorStateMatcher();
  userAlreadyExists=null;
  constructor(private dialog:MatDialog,private notifications:NotificationConstantsService,private fb:FormBuilder,private authService:AuthenticationServiceService,private router:Router) { }

  genders: string[] = ["Male", "Female"];
  RoleType:RoleType[]=[
    {
      roleName:"Viewer",
      roleValue:"viewer"
    },
    {
      roleName:"Client",
      roleValue:"client"
    },
    {
      roleName:"Admin",
      roleValue:"admin"
    },
  ];
  ngOnInit(): void {


  }
  userRegistrationForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
      lastName: [''],
      roleType:[ {value: '', disabled: 'true' }],
      gender: ['', Validators.required],
      dob: ['', [Validators.required]],
      mobileNumber: ['', Validators.pattern('[0-9.]*')],
      emailId: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    },
    { validator: this.checkPasswords }
  );
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }
}
  get firstName() {
    return this.userRegistrationForm.get('firstName');
  }

  get gender() {
    return this.userRegistrationForm.get('gender');
  }
  get dob() {
    return this.userRegistrationForm.get('dob');
  }
  get mobileNumber() {
    return this.userRegistrationForm.get('mobileNumber');
  }
  get emailId() {
    return this.userRegistrationForm.get('emailId');
  }
  get password() {
    return this.userRegistrationForm.get('password');
  }
  get confirmPassword() {
    return this.userRegistrationForm.get('confirmPassword');
  }


  onSubmit()
  {
    this.model.roleType="viewer";
this.authService.userRegister(this.model).subscribe(
  result=>
  {
    let dialogRef=this.dialog.open(AlertDialogComponent,{
      height:"200px",
      width:"500px",
      data:
      {
       registerSuccessMsg:"Hi! "+result.firstName+" your "+result.roleType+" account is successfully created.."
      }
    });
    dialogRef.afterClosed().subscribe(
      data=>
      {
        this.router.navigate(['/signin']);
      }
    );
   // alert("user "+result.roleType+" is created...... ");
  },
  error=>
  {
    console.log(error.error.message);
    if(error.error.message!=null)
    {
      this.userAlreadyExists= error.error.message;
      let dialogRef=this.dialog.open(AlertDialogComponent,{
        height:"200px",
        width:"500px",
        data:
        {
          registerErrorMsg:this.userAlreadyExists
        }
      });
      dialogRef.afterClosed().subscribe(
        data=>
        {

        }
      );
    }
  }
)
  }
  existingUser()
  {
    this.router.navigate(['/signin']);
  }
}
