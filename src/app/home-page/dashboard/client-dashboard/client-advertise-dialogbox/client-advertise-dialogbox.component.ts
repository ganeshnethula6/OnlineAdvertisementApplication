import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientAdvertisementModel } from 'src/app/home-page/models/client-advertisement-model';
import { UserRegistrationModel } from 'src/app/home-page/models/user-registration.model';
import { ClientServiceService } from 'src/app/home-page/services/client-service.service';

@Component({
  selector: 'app-client-advertise-dialogbox',
  templateUrl: './client-advertise-dialogbox.component.html',
  styleUrls: ['./client-advertise-dialogbox.component.css']
})
export class ClientAdvertiseDialogboxComponent implements OnInit {
newAd!:boolean;
updateAd!:boolean;
model=new ClientAdvertisementModel();
userDetail= new UserRegistrationModel();
updateModel:any;
clientAdvertisementForm!:any;
addTypes:string[]=["Education","Entertainment","Business","Sports","Social Comunnity","Governement"];
  selectedFile!: File;
 uploadImageData!:any;
userModel=new UserRegistrationModel();
  constructor(private clientService:ClientServiceService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<ClientAdvertiseDialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:UserRegistrationModel) { }

  ngOnInit(): void {
   // this.model=this.data.promotionDetail;


  //  this.updateModel=this.data;
   // this.model.userId=this.data;
// if(this.data.roleType=="client")
// {
//   this.newAd=false;
//   this.updateAd=true;

// }
// else{
//   this.newAd=true;
//   this.updateAd=false;

// }

    this.clientAdvertisementForm=this.fb.group(
      {
        addType:['',Validators.required],
        addTitle:['',[Validators.required]],
        addTag:['',Validators.required],
        addDesc:['',],
       // addFile:['',Validators.required]
      }
    );
  }
  get addType()
  {
    return this.clientAdvertisementForm.get('addType');
  }

  public get addTitle() {
    return this.clientAdvertisementForm.get('addTitle');
  }
  public get addTag(){
    return this.clientAdvertisementForm.get('addTag');
  }
  public get addTaddDescitle(){
    return this.clientAdvertisementForm.get('addDesc');
  }
  // public get addFile() {
  //   return this.clientAdvertisementForm.get('addFile');
  // }
  onCancel()
  {
this.dialogRef.close(0);
  }
  onSubmit()
  {
    if(true)
    {
    //  this.userDetail.promotionDetail.push(this.model);
      this.clientService.addPromotion(this.userDetail ,this.data.userId).subscribe(
        data=>
        {
          this.clientService.promotionDetail=data.promotionDetail;
          console.log(data);
          alert("user "+data.addType+" is created...... ");

        },
        error=>
        {

        }
      )
    }
    else{
      this.clientService.updatePromotion(this.updateModel,this.updateModel.promotionId).subscribe(
        data=>
        {
          console.log(data);

        },
        error=>
        {

        }
      )
    }

  }
  onFileChanged(event:any)
  {
    this.selectedFile = event.target.files[0];
    this.uploadImageData = new FormData();
   this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  }

  // this.clientService.updatePromotion(params.data,params.data.clientId).subscribe(
  //   data=>
  //   {

  //   }
  // )

}
