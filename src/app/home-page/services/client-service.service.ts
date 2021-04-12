import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientAdvertisementModel } from '../models/client-advertisement-model';
import { UserRegistrationModel } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  promotionDetail!:ClientAdvertisementModel;
  userDetail!:UserRegistrationModel;
  BASE_URL="http://localhost:8080//online-advertisement-application";
  constructor(private httpClient:HttpClient){
      }
      // addPromotion(user:UserRegistrationModel,id:number):Observable<any>
      // {
      //     return this.httpClient.put("http://localhost:8080//online-advertisement-application/user/promotions/"+id,user);
      // }
      addPromotion(user:UserRegistrationModel,id:number):Observable<any>
      {
          return this.httpClient.put("http://localhost:8080//online-advertisement-application/user/promotion/"+24,user);
      }
      getPromotionDetailsById(id:number):Observable<any>
      {
      return this.httpClient.get("http://localhost:8080//online-advertisement-application/promotions/"+id);
      }
      getPromotionDetails():Observable<any>
      {
      return this.httpClient.get(this.BASE_URL+"/promotions");
      }
      deletePromotion(id:any):Observable<any>
      {
          return this.httpClient.delete(this.BASE_URL+"/promotions/"+id);
      }
      updatePromotion(promotion:ClientAdvertisementModel,id:any):Observable<any>
      {
          return this.httpClient.put(this.BASE_URL+"/promotions/"+id,promotion);
      }
}
