import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { ProfileDialogComponent } from '../../dialog/profile-dialog/profile-dialog.component';
import { PromotionDialogComponent } from '../../dialog/promotion-dialog/promotion-dialog.component';
import { RegistrationDialogComponent } from '../../dialog/registration-dialog/registration-dialog.component';
import { ClientAdvertisementModel } from '../../models/client-advertisement-model';
import { UserRegistrationModel } from '../../models/user-registration.model';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { ClientServiceService } from '../../services/client-service.service';
import { NotificationConstantsService } from '../../services/constants/notification-constants.service';
import { RestApiService } from '../../services/rest-api.service';
import { ButtonCellRendererComponent } from '../grid-components/button-cell-renderer/button-cell-renderer.component';
import { HyperlinkCellRendererComponent } from '../grid-components/hyperlink-cell-renderer/hyperlink-cell-renderer.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
columnDefs:any;
promotionColumnDefs:any;
promotionRowData:ClientAdvertisementModel[]=[];
rowData:UserRegistrationModel[]=[];
  gridApi: any;
  frameworkComponents:any;
  userDetails:any;
  constructor(private authService:AuthenticationServiceService,
    private dialog:MatDialog,
    private notifications:NotificationConstantsService,
   private clientService:ClientServiceService,
   private restService:RestApiService)
     {
       this.frameworkComponents =
           {
             btnCellRenderer: ButtonCellRendererComponent,
             linkCellRenderer:HyperlinkCellRendererComponent
           }
     }
  ngOnInit(): void {

    this.userDetails=this.authService.user;
this.authService.getUsers().subscribe(
  data=>{
    this.rowData=data;
  });

  this.restService.getPromotionDetails()
  .subscribe(
    data => {
      this.promotionRowData = data;
    }
  );

    this.columnDefs=[
      {
        field: 'userId',
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
        field:"firstName",
        headerName:" First Name",
        sortable:"true"
      },
      {
        field:"roleType",
        headerName:"Role",
        sortable:"true"
      },
      {
        field:"dob",
        headerName:" Date Of Birth",
        sortable:"true"
      },
      {
        field:"mobileNumber",
        headerName:"Mobile Number",
        sortable:"true"
      },
      {
        field:"emailId",
        headerName:" Email Id ",
        sortable:"true"
      },
      {
        field:"joinedDate",
        headerName:"Date of Joined",
        sortable:"true"
      },
      {
        headerName: 'Delete',
        cellRenderer: 'btnCellRenderer',
        sortable:"true",
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      }
    ];

    this.promotionColumnDefs=[{
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
      headerName:" Advertisement Type",
      sortable:"true"
    },
    {
      field:"addTitle",
      headerName:" Title",
      sortable:"true"
    },
    {
      field:"addTag",
      headerName:" Tag/Slogon",
      sortable:"true"
    },
    {
      field:"addDesc",
      headerName:" Description ",
      sortable:"true"
    },
    {
      field:"createdBy",
      headerName:"Post Created By",
      sortable:"true"
    },
    {
      field:"createdDate",
      headerName:"Post Created Date",
      sortable:"true"
    },
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
  //update user
  updateDetails(params:any)
  {
    let dialogRef=this.dialog.open(AlertDialogComponent,{
      height:"220px",
      width:"500px",
      data:
      {
      updateExistingUserMsg:this.notifications.UPDATE_EXISTING_USER,
      }
    });
    dialogRef.afterClosed().subscribe(
      data=>
      {

      }
    )
  }

  //delete user
  onDeleteButtonClick(params:any)
  {
    if(params.data.roleType)
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
            this.authService.deleteUser(params.data.userId).subscribe(
              data=>
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
    else
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
            this.clientService.deletePromotion(params.data.promotionId).subscribe(
              data=>
              {

              }

            )
            let selectedNode = params.data;
                    let newRowData = this.promotionRowData.filter(row => {
                      return row !== selectedNode;
                    });
                    this.promotionRowData = newRowData;
          }
        }
      );
    }

  }

  onGridReady(params:any)
  {
    this.gridApi = params.api;
    this.authService.getUsers()
      .subscribe(
        data => {
          this.rowData = data;
        }
      );
  }
  onGridReadyOfPromotion(params:any)
  {
    this.gridApi = params.api;
    this.restService.getPromotionDetails()
      .subscribe(
        data => {
          this.promotionRowData = data;
        }
      );
  }


//create new  user
createNewUser()
  {
    let createDialogRef=this.dialog.open(RegistrationDialogComponent,{
      height: '500px',
      width: '600px',
      data:
      {
roleName:"admin"
      }
    });
    createDialogRef.afterClosed().subscribe(
      data=>
      {
        this.authService.getUsers()
        .subscribe(
          data => {
            this.rowData = data;
          }
        );
      }
    )
  }

  //create new add
  createNewAd()
  {
    let dialogRef=this.dialog.open(PromotionDialogComponent,{
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
    dialogRef.afterClosed().subscribe(
      data=>
      {
if(data=1)
{
  // let newRowData = this.promotionRowData.slice();
  // newRowData.push(this.clientService.promotionDetail);
  // this.promotionRowData = newRowData;
  this.clientService.getPromotionDetails()
  .subscribe(
    data => {
      this.promotionRowData = data;
    }
  );

}
      }
    )
  }



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
