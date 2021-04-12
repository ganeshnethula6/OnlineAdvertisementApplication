import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { AlertMsg } from './alert-msg.model';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:AlertMsg,private dialogRef:MatDialogRef<AlertDialogComponent>,private authService:AuthenticationServiceService) { }
  registerErrorMsg=this.data.registerErrorMsg;
  registerSuccessMsg=this.data.registerSuccessMsg;
  loginSuccessMsg=this.data.loginSuccessMsg;
  loginErrorMsg=this.data.loginErrorMsg;
  logOutMsg=this.data.logOutMsg;
  deleteExistingUserMsg=this.data.deleteExistingUserMsg;
  updateExistingUserMsg=this.data.updateExistingUserMsg;
  ngOnInit(): void {
  }
  onCancel()
  {
    this.dialogRef.close(1);
  }
  onSubmit()
  {
    this.dialogRef.close(0);
  }
}
