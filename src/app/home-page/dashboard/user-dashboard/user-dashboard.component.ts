import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { ProfileDialogComponent } from '../../dialog/profile-dialog/profile-dialog.component';
import { ClientAdvertisementModel } from '../../models/client-advertisement-model';
import { CommentModel } from '../../models/Comment.model';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { NotificationConstantsService } from '../../services/constants/notification-constants.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  promotionDetails: ClientAdvertisementModel[] = [];
  promotionDetailss: ClientAdvertisementModel[] = [];
  promotionDetail!:ClientAdvertisementModel;
  comments:CommentModel[]=[];
  promotionCategories=["All","Education","Entertainment","Business","Sports","Social Comunnity","Governement","Others"];
  userDetails: any;
  addCommentSelected: boolean = false;
  addLikeSelected: boolean = false;
  showCommetSelected:boolean=false;
  index: any;
  likeColor = 'primary';
  commentColor = 'primary';
  commentModel = new CommentModel();
  commentFormGroup:any;
  base64Data: any;
  retrieveResonse: any;
  retrivedImage!: string;

  constructor(
    private restService: RestApiService,
    private authService: AuthenticationServiceService,
    private dialog: MatDialog,
    private restServies: RestApiService,
    private fb:FormBuilder,
    private notifications:NotificationConstantsService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.user;
    this.restService.getPromotionDetails().subscribe((data) => {
this.promotionDetailss=data;
this.promotionDetailss.forEach((promotionDetail:any,index:any) => {
        this.base64Data = promotionDetail.fileDetail[0].picByte;
        promotionDetail.fileDetail[0].retrivedImage= 'data:image/jpeg;base64,'+this.base64Data;
      this.promotionDetails.push(promotionDetail);
    });
    });
    this.commentFormGroup=this.fb.group(
      {commentValidator:['',[Validators.required]]}
    );
  }
  openProfile() {
    let dialogRef = this.dialog.open(ProfileDialogComponent, {
      height: '400px',
      width: '400px',
      data: {
        userId: this.userDetails.userId,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        gender: this.userDetails.gender,
        roleType: this.userDetails.roleType,
        dob: this.userDetails.dob,
        mobileNumber: this.userDetails.mobileNumber,
        emailId: this.userDetails.emailId,
        // user:this.userDetails
      },
    });
    dialogRef.afterClosed().subscribe();
  }
  addComment(index: any) {
    this.addCommentSelected = !this.addCommentSelected;
    this.index = index;
    this.showCommetSelected=! this.showCommetSelected;
    this.comments=[];
  }
  addLike(index: any) {
    this.addLikeSelected = !this.addLikeSelected;
    this.index = index;
  }
  postComment(promotionId: number) {
    this.commentModel.commentBy = this.userDetails.firstName;
    const commentdata = {
      "comment": [this.commentModel],
    };
    this.restService
      .addCommentbyId(promotionId, commentdata)
      .subscribe((data) => {
        console.log(data);
        this.restService.getCommentsById(promotionId).subscribe(
          data=>
          {
 this.commentModel.comment = '';
        this.comments=data;
          }
        )
      });

  }
  showComments(id:any,index:any)
  {
    this.showCommetSelected=!this.showCommetSelected;
    this.index=index;
    if(this.showCommetSelected)
    {
      this.restService.getCommentsById(id).subscribe(
        data=>
        {
      this.comments=data;
        }
      )
        }
        else
        {
          this.comments=[];
        }
    }
    openByCategory(category:any)
    {
      if(category!="All")
      {
        this.restService.getPromotionDetailsByCategory(category).subscribe(
          data=>
          {
            this.promotionDetails = [];
            this.promotionDetailss=data;
            this.promotionDetailss.forEach((promotionDetail:any,index:any) => {
                    this.base64Data = promotionDetail.fileDetail[0].picByte;
                    promotionDetail.fileDetail[0].retrivedImage= 'data:image/jpeg;base64,'+this.base64Data;
                  this.promotionDetails.push(promotionDetail);})
            }

        )

      }
      else{
        this.restService.getPromotionDetails().subscribe((data) => {
          this.promotionDetails = [];
          this.promotionDetailss=data;
          this.promotionDetailss.forEach((promotionDetail:any,index:any) => {
                  this.base64Data = promotionDetail.fileDetail[0].picByte;
                  promotionDetail.fileDetail[0].retrivedImage= 'data:image/jpeg;base64,'+this.base64Data;
                this.promotionDetails.push(promotionDetail);})
        });

      }

    }


    //logout
    logOut()
    {
      let logoutDialogRef=this.dialog.open(AlertDialogComponent,{
        height:"220px",
        width:"600px",
        data:
        {
        logOutMsg:this.notifications.LOGOUT_USER_ACCOUNT,
        }
      });
    logoutDialogRef.afterClosed().subscribe(
      data=>
      {
        if(data=0)
        {
          this.router.navigate(['/home']);
        }
        this.router.navigate(['/home']);
        // this.no_user=true;

        // this._user=false;
      }
    )
    }

}

