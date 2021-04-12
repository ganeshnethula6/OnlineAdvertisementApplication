import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientAdvertisementModel } from 'src/app/home-page/models/client-advertisement-model';
import { UserRegistrationModel } from 'src/app/home-page/models/user-registration.model';
import { ClientServiceService } from 'src/app/home-page/services/client-service.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.css']
})
export class PromotionDialogComponent implements OnInit {

  model=new ClientAdvertisementModel();
  PromotiomDetailForm!:any;
  addTypes:string[]=["Education","Entertainment","Business","Sports","Social Comunnity","Governement"];
  selectedFile!: File;
  uploadImageData!:any;
  userDetail!:UserRegistrationModel;
  formData!: FormData;


    constructor(private clientService:ClientServiceService,
      private fb:FormBuilder,
      public promotionDialogRef: MatDialogRef<PromotionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:UserRegistrationModel,
      private apiService:RestApiService) { }

    ngOnInit(): void {
    this.userDetail=this.data;
      this.PromotiomDetailForm=this.fb.group(
        {
          addType:['',Validators.required],
          addTitle:['',[Validators.required]],
          addTag:['',Validators.required],
          addDesc:['',],
        //  addFile:['',Validators.required]
        }
      );
    }
    get addType()
    {
      return this.PromotiomDetailForm.get('addType');
    }

    public get addTitle() {
      return this.PromotiomDetailForm.get('addTitle');
    }
    public get addTag(){
      return this.PromotiomDetailForm.get('addTag');
    }
    public get addTaddDescitle(){
      return this.PromotiomDetailForm.get('addDesc');
    }
    // public get addFile() {
    //   return this.clientAdvertisementForm.get('addFile');
    // }

    onFileChanged(event:any)
    {
      this.selectedFile = event.target.files[0];
    //   this.uploadImageData = new FormData();
    //  this.uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    //  this.apiService.uploadFile(this.uploadImageData).subscribe(
    //    data=>
    //    {
    //      if(data.response==200)
    //      {
    //        console.log("file uploaded");
    //      }
    //      else{
    //       console.log("not upl");
    //      }

    //    }
    //  )
    }


    onSubmit()
    {
      console.log(1);
      this.clientService.promotionDetail=this.model;
this.model.createdBy=this.userDetail.firstName+ " "+this.userDetail.lastName;
this.model.updatedBy=this.userDetail.firstName+ " "+this.userDetail.lastName;
console.log(2);


const data:any={"promotionDetail":[this.model]}
console.log(3);


this.formData=new FormData();
this.formData.append('file', this.selectedFile, this.selectedFile.name);
const userData = JSON.stringify(data);
this.formData.append('user',userData);
this.apiService.addPromotionWithFile(this.userDetail.userId,this.formData).subscribe(
// this.apiService.addPromotion(this.userDetail.userId,data).subscribe(
    data=>
  {console.log(5);
   this.clientService.promotionDetail=data.promotionDetail;
   console.log(6);
   this.promotionDialogRef.close(1);
  },
  error=>
  {

  }
)

    }

    onCancel()
    {
  this.promotionDialogRef.close(0);
    }

  }
