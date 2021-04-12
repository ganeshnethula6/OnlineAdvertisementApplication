import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { AuthenticationServiceService } from '../../services/authentication-service.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:UserRegistrationModel,private dialogRef:MatDialogRef<ProfileDialogComponent>,private authService:AuthenticationServiceService) { }
  userDetail!:UserRegistrationModel;
  ngOnInit(): void {
    this.userDetail=this.data;
  }

}
