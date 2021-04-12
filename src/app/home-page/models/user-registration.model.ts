import { Address } from "./address.model";
import { ClientAdvertisementModel } from "./client-advertisement-model";

export class UserRegistrationModel
{
   public userId!: number;
   public firstName!:string;
   public lastName!:string;
   public roleType!:string;
   public gender!:string;
   public dob!:string;
   public mobileNumber!:string;
   public userAddress!:Address[];
   public shopId!:number;
   public shopName!:string;
   public shopTag!:string;
   public shopCategory!:string;
   public shopAddress!:Address[];
   public emailId!:string;
   public password!:string;
   public joinedDate!:string;
   public joinedBy!:string;
  public updateddate!:string;
  public updatedBy!:string;
   public promotionDetail!:ClientAdvertisementModel[];
   constructor()
  {

  }
}
