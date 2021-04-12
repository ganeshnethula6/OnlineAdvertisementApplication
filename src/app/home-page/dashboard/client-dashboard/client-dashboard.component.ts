import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { ProfileDialogComponent } from '../../dialog/profile-dialog/profile-dialog.component';
import { PromotionDialogComponent } from '../../dialog/promotion-dialog/promotion-dialog.component';
import { PromotionUpdateDialogComponent } from '../../dialog/promotion-update-dialog/promotion-update-dialog.component';
import { ClientAdvertisementModel, FunType } from '../../models/client-advertisement-model';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { ClientServiceService } from '../../services/client-service.service';
import { NotificationConstantsService } from '../../services/constants/notification-constants.service';
import { RestApiService } from '../../services/rest-api.service';
import { ButtonCellRendererComponent } from '../grid-components/button-cell-renderer/button-cell-renderer.component';
import { HyperlinkCellRendererComponent } from '../grid-components/hyperlink-cell-renderer/hyperlink-cell-renderer.component';
import { ClientAdvertiseDialogboxComponent } from './client-advertise-dialogbox/client-advertise-dialogbox.component';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  frameworkComponents: any;
  rowData: ClientAdvertisementModel[]=[];
  gridApi: any;
  funType!: FunType;
  userDetails:any;
  model=new ClientAdvertisementModel();
  columnDefs!:any;


  constructor(private dialog:MatDialog,
    private clientService:ClientServiceService,
    private authService:AuthenticationServiceService,
    private restService:RestApiService,
    private router:Router,
    private notifications:NotificationConstantsService) {
    this.frameworkComponents = {
      btnCellRenderer: ButtonCellRendererComponent,
      linkCellRenderer:HyperlinkCellRendererComponent
    }
  }
  ngOnInit(): void {
    //calling rest api
  this.userDetails=this.authService.user;
    this.restService.getPromotionDetailsById(this.userDetails.userId).subscribe(
      data=>
      {
this.rowData=data;
      }
    );

//column defination
    this.columnDefs=[
      {
        field: 'promotionId',
        headerName: "Id",
        sortable:"true",
        filter:"agSetColumnFilter",
        cellRenderer: 'linkCellRenderer',
        cellRendererParams:
        {
          onClick:this.updateDetails.bind(this),
        }
      },
      {
        field:"addType",
        headerName:" Post Type"
      },
      {
        field:"addTitle",
        headerName:"Post Title"
      },
      {
        field:"addTag",
        headerName:" Post Tag"
      },
      {
        field:"addDesc",
        headerName:" Description "
      },
      // {
      //   field:"addFile",
      //   headerName:"Pictures/Files"
      // },
      {
        headerName: 'Delete',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      }
    ]
  }
//end of ngOnInt

// create new post
  createNewPost()
  {
    let createDialogRef=this.dialog.open(PromotionDialogComponent,{
      height: '500px',
      width: '600px',
      data:
      {
        userId:this.userDetails.userId,
        firstName:this.userDetails.firstName,
        lastName:this.userDetails.lastName,
        gender:this.userDetails.gender,
        roleType:this.userDetails.roleType,
        dob:this.userDetails.dob,
        mobileNumber:this.userDetails.mobileNumber,
        emailId:this.userDetails.emailId
       }
    });

    createDialogRef.afterClosed().subscribe(
      result =>
       {console.log(7);
        if (result==1) {
          console.log(8);
          // let newRowData = this.rowData.slice();
          // newRowData.push(this.clientService.promotionDetail);
          // this.rowData = newRowData;
          this.restService.getPromotionDetailsById(this.userDetails.userId).subscribe(
            data=>
            {
      this.rowData=data;
            }
          );
          console.log(9);
        }

       });
  }
//  end of new post

// onGrid fun
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.restService.getPromotionDetailsById(this.userDetails.userId)
      .subscribe(
        data => {
          this.rowData = data;
        }
      );
  }
  //end of onGrid

  //update Promotion Details
  updateDetails(params:any)
  {

    let dialogRef=this.dialog.open(PromotionUpdateDialogComponent,{
      height: '500px',
      width: '600px',
      data:{
        promotionId:params.data.promotionId,
        addType:params.data.addType,
        addTitle:params.data.addTitle,
        addTag:params.data.addTag,
        addDesc:params.data.addDesc,
        createdDate:params.data.createdDate,
        createdBy:params.data.createdBy,
        updatedDate:params.data.updatedDate
      }
    });
    dialogRef.afterClosed().subscribe(
      result =>
       {
        if(result!=0)
        {
          this.restService.getPromotionDetailsById(this.userDetails.userId)
          .subscribe(
          data => {
            var newData=data;
            this.gridApi.setRowData(newData);
          }
          )
        }
       });
  }
  // end of update promotion

  //delete Promotion
  onDeleteButtonClick(params:any)
  {


            let dialogRef=this.dialog.open(AlertDialogComponent,{
              height:"220px",
              width:"600px",
              data:
              {
              deleteExistingUserMsg:this.notifications.DELETE_EXISTING_USER,
              }
            });
            dialogRef.afterClosed().subscribe(
              data=>
              {
                if(data!=1)
                {
                  this.restService.deletePromotion(params.data.promotionId).subscribe(
                    result=>
                    {

                    }
                  )
                  let selectedNode = params.data;
                  let newRowData = this.rowData.filter(row => {
                    return row !== selectedNode;
                  });
                  this.rowData = newRowData;
                }
              }
            );
  }
  //end of delete


  //open profile dialog fun
  openProfile()
  {
    let dialogRef=this.dialog.open(ProfileDialogComponent,{
      height:"400px",
      width:"400px",
      data:
      {
      userId:this.userDetails.userId,
      firstName:this.userDetails.firstName,
      lastName:this.userDetails.lastName,
      gender:this.userDetails.gender,
      roleType:this.userDetails.roleType,
      dob:this.userDetails.dob,
      mobileNumber:this.userDetails.mobileNumber,
      emailId:this.userDetails.emailId
     // user:this.userDetails
      }
    });
    dialogRef.afterClosed().subscribe(
      data=>
      {
      }
    )
  }

  //end of open profile
}
