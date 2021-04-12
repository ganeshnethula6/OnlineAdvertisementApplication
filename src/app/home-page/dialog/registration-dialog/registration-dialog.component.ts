import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Address } from '../../models/address.model';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { ApplicationService } from '../../services/application.service';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { NotificationConstantsService } from '../../services/constants/notification-constants.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
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
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  public model!:UserRegistrationModel;
  public userAddress!:Address;
  public shopAddress!:Address;
  confirmpsw!:string;
  matcher = new MyErrorStateMatcher();
  userAlreadyExists=null;
  roleType: boolean=false;
  constructor(private dialog:MatDialog,
    private registerDialogRef:MatDialogRef<RegistrationDialogComponent>,
    private notifications:NotificationConstantsService,
    private fb:FormBuilder,
    private authService:AuthenticationServiceService,
    @Inject(MAT_DIALOG_DATA) public data:RoleType,
    private router:Router,
    private service:ApplicationService) { }

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
    this.model=new UserRegistrationModel();
    this.userAddress=new Address();
    this.shopAddress=new Address();
    if(this.data.roleName=="viewer")
    {
      this.roleType=true;
      this.model.roleType="viewer";
      // this.userRegistrationForm.get('roleTye')?.disable();
      // this.userRegistrationForm.get('userCity')?.clearValidators();
      //   this.userRegistrationForm.get('userState')?.clearValidators();
      //   this.userRegistrationForm.get('userCountry')?.clearValidators();
      //   this.userRegistrationForm.get('userAddressDesc')?.clearValidators();
         this.userRegistrationForm.controls['roleType'].disable();
        this.userRegistrationForm.get('shopId')?.clearValidators();
        this.userRegistrationForm.get('shopName')?.clearValidators();
        this.userRegistrationForm.get('shopTag')?.clearValidators();
        this.userRegistrationForm.get('shopCategory')?.clearValidators();
        this.userRegistrationForm.get('shopCity')?.clearValidators();
        this.userRegistrationForm.get('shopState')?.clearValidators();
        this.userRegistrationForm.get('shopCountry')?.clearValidators();
        this.userRegistrationForm.get('shopPincode')?.clearValidators();
        this.userRegistrationForm.get('shopAddressDesc')?.clearValidators();

        // this.userRegistrationForm.get('userCity')?.updateValueAndValidity();
        // this.userRegistrationForm.get('userState')?.updateValueAndValidity();
        // this.userRegistrationForm.get('userCountry')?.updateValueAndValidity();
        // this.userRegistrationForm.get('userPincode')?.updateValueAndValidity();
        // this.userRegistrationForm.get('userAddressDesc')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopId')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopName')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopTag')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopCategory')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopCity')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopState')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopCountry')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopPincode')?.updateValueAndValidity();
        this.userRegistrationForm.get('shopAddressDesc')?.updateValueAndValidity();

    }
    else if (this.data.roleName=="admin")
    {
      this.roleType=false;
      // this.userRegistrationForm.get('userCity')?.setValidators(Validators.required);
      // this.userRegistrationForm.get('userState')?.setValidators(Validators.required);
      // this.userRegistrationForm.get('userCountry')?.setValidators(Validators.required);
      // this.userRegistrationForm.get('userAddressDesc')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopId')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopName')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopTag')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopCategory')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopCity')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopState')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopCountry')?.setValidators(Validators.required);
      this.userRegistrationForm.get('shopAddressDesc')?.setValidators(Validators.required);
    }

  }
  userRegistrationForm = this.fb.group(
    {
      firstName: [{value:"",
      disable:false}, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      lastName: ['',],
      roleType:['',Validators.required],
      gender: ['', Validators.required],
      dob: ['', [Validators.required]],
      mobileNumber: ['',[Validators.required, Validators.pattern('[0-9.+]*')]],
      userCity:['',Validators.required],
      userState:['',Validators.required],
      userCountry:['',Validators.required],
      userPincode:['',Validators.required],
      userAddresDesc:['',Validators.required],
      shopId:[''],
      shopName:[''],
      shopTag:[''],
      shopCategory:[''],
      shopLogo:[''],
      shopCity:[''],
      shopState:[''],
      shopCountry:[''],
      shopPincode:[''],
      shopAddressDesc:[''],
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
  get userCity()
  {
    return this.userRegistrationForm.get('userCity');
  }
  get userState()
  {
    return this.userRegistrationForm.get('userState');
  }
  get userCountry()
  {
    return this.userRegistrationForm.get('userCountry');
  }
  get userPincode()
  {
    return this.userRegistrationForm.get('userPincode');
  }
  get userAddresDesc()
  {
    return this.userRegistrationForm.get('userAddresDesc');
  }
  get shopId()
  {
    return this.userRegistrationForm.get('shopId');
  }
  get shopName()
  {
    return this.userRegistrationForm.get('shopName');
  }
  get shopTag()
  {
    return this.userRegistrationForm.get('shopTag');
  }
  get shopCategory()
  {
    return this.userRegistrationForm.get('shopCategory');
  }
  get shopCity()
  {
    return this.userRegistrationForm.get('shopCity');
  }
  get shopState()
  {
    return this.userRegistrationForm.get('shopState');
  }
  get shopCountry()
  {
    return this.userRegistrationForm.get('shopCountry');
  }
  get shopPincode()
  {
    return this.userRegistrationForm.get('shopPincode');
  }
  get shopAddressDesc()
  {
    return this.userRegistrationForm.get('shopAddressDesc');
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
    const userAddress=[this.userAddress];
    const shopAddress=[this.shopAddress];
    this.model.roleType=="viewer"?this.model.userAddress=userAddress:(this.model.userAddress=userAddress,this.model.shopAddress=shopAddress);
//  this.model.userAddress=userAddress;
//  this.model.shopAddress=shopAddress;
this.authService.userRegister(this.model).subscribe(
  result=>
  {
    this.service.userDetail=result;
    let alertDialogRef=this.dialog.open(AlertDialogComponent,{
      height:"200px",
      width:"500px",
      data:
      {
       registerSuccessMsg:"Hi! "+result.firstName+" your "+result.roleType+" account is successfully created.."
      }
    });
    alertDialogRef.afterClosed().subscribe(
      data=>
      {

        this.registerDialogRef.close(1);
      }
    );
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

  closeDialog()
  {
    this.registerDialogRef.close(0)
  }
  existingUser()
  {


    this.registerDialogRef.close(0)

  }


}
