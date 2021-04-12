import { FileDetail } from "./promotion.file";

export class ClientAdvertisementModel
{
  public promotionId!:number;
  public userId!:number;
  public addType!:string;
  public addTitle!:string;
  public addTag!:string;
  public addDesc!:string;
  public fileDetail!:any;
  public createdDate!:string;
  public createdBy!:string;
  public updatedDate!:string;
  public updatedBy!:string;
  public funType!:FunType;
  constructor()
  {

  }
}
export class FunType{
  newPromotion!:boolean;
  updatePromotion!:boolean;
  constructor()
  {

  }

}
