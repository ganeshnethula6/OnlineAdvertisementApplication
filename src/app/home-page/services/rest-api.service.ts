import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientAdvertisementModel } from '../models/client-advertisement-model';
import { UserRegistrationModel } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient:HttpClient) { }
/***************************Constants***************************/
  BASE_URL="http://localhost:8080/online-advertisement-application";


/*************************Authentication Api *******************/
//login api

login(user:UserRegistrationModel):Observable<any>
{
    return this.httpClient.post(this.BASE_URL+"/login",user);
}

  /**************************User Api ************************/
  //1.User Register
  newRegister(user:UserRegistrationModel):Observable<any>
  {
      return this.httpClient.post(this.BASE_URL+"/register",user);
  }

  //2. Getting  all Users

  getUsers():Observable<any>
  {
  return this.httpClient.get(this.BASE_URL+"/users");
  }

  //3.delete User By user Ud
  deleteUser(id:any):Observable<any>
  {
      return this.httpClient.delete(this.BASE_URL+"/user/"+id);
  }
  //4.update User by User Id
  updateUser(user:UserRegistrationModel,id:any):Observable<any>
  {
      return this.httpClient.put(this.BASE_URL+"/user/"+id,user);
  }

    /**************************Promotion Api ***************************/
    //1.add Promotion by using User id coz promotion is part of user.
      addPromotionWithFile(id:number,uploadImageData:any
        ):Observable<any>
      {
          return this.httpClient.put(this.BASE_URL+"/user/promotion/"+id,uploadImageData);
      }
      addPromotion(id:number,data:any):Observable<any>
      {
        console.log(4);
          return this.httpClient.put(this.BASE_URL+"/user/promotion/"+id,data);
      }
      //2.get promotions by  userId
      getPromotionDetailsById(id:number):Observable<any>
      {
      return this.httpClient.get(this.BASE_URL+"/promotions/"+id);
      }
      // 3. get all promotions
      getPromotionDetails():Observable<any>
      {
      return this.httpClient.get(this.BASE_URL+"/promotions");
      }
      // 4. delete promotion by promotion Id
      deletePromotion(id:any):Observable<any>
      {
          return this.httpClient.delete(this.BASE_URL+"/promotions/"+id);
      }
      // 5. update promotion by promotion Id
      updatePromotion(promotion:ClientAdvertisementModel,id:any):Observable<any>
      {
          return this.httpClient.put(this.BASE_URL+"/promotions/"+id,promotion);
      }
      //6.get promotions by promotion catogory
      getPromotionDetailsByCategory(category:any):Observable<any>
      {
      return this.httpClient.get(this.BASE_URL+"/promotions/category/"+category);
      }
 /**************************Upload File ***************************/
uploadFile(file:any):Observable<any>
{
    return this.httpClient.post(this.BASE_URL+"/promotion/upload",file);
}

 /**************************Comments to Post ***************************/
 addCommentbyId(id:number,commenrDetail:any):Observable<any>
 {
   return this.httpClient.put(this.BASE_URL + "/promotion/comment/" + id, commenrDetail);
 }
 getCommentsById(id:number):Observable<any>
 {
   return this.httpClient.get(this.BASE_URL + "/promotion/comment/" + id);
 }

}
