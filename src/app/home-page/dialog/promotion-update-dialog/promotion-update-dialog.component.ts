import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientAdvertisementModel } from '../../models/client-advertisement-model';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { ClientServiceService } from '../../services/client-service.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-promotion-update-dialog',
  templateUrl: './promotion-update-dialog.component.html',
  styleUrls: ['./promotion-update-dialog.component.css']
})
export class PromotionUpdateDialogComponent implements OnInit {

  updateModel=new ClientAdvertisementModel();
  clientAdvertisementForm!:any;
  addTypes:string[]=["Education","Entertainment","Business","Sports","Social Comunnity","Governement"];
  selectedFile!: File;
  uploadImageData!:any;
  userDetail!:UserRegistrationModel;
  formData!: FormData;


    constructor(private clientService:ClientServiceService,
      private fb:FormBuilder,
      public dialogRef: MatDialogRef<PromotionUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:ClientAdvertisementModel,
      private apiService:RestApiService) { }

    ngOnInit(): void {
    this.updateModel=this.data;
      this.clientAdvertisementForm=this.fb.group(
        {
          addType:[{value: '', disabled: 'true' },Validators.required],
          addTitle:[{value: '', disabled: 'true' },[Validators.required]],
          addTag:[{value: '', disabled: 'true' },Validators.required],
          addDesc:['',],
         addFile:['',Validators.required]
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
    public get addFile() {
      return this.clientAdvertisementForm.get('addFile');
    }

    onFileChanged(event:any)
    {
      this.selectedFile = event.target.files[0];
    }


    onSubmit()
    {

   this.apiService.updatePromotion(this.updateModel,this.updateModel.promotionId).subscribe(
  data=>
  {
   this.clientService.promotionDetail=data;
   this.dialogRef.close(1)
  },
  error=>
  {

  }
)

    }

    onCancel()
    {
  this.dialogRef.close(0);
    }
}
