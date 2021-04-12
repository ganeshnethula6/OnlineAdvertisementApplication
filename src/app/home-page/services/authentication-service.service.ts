import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationModel } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
BASE_URL="http://localhost:8080//online-advertisement-application";
roleType!:string;
logOut!:boolean;
  private _user: UserRegistrationModel[] = [];
  public get user(): UserRegistrationModel[] {
    return this._user;
  }
  public set user(value: UserRegistrationModel[]) {
    this._user = value;
  }


  constructor(private httpClient:HttpClient) { }
  userRegister(user:UserRegistrationModel):Observable<any>
  {
      return this.httpClient.post(this.BASE_URL+"/register",user);
  }
  login(user:UserRegistrationModel):Observable<any>
  {
      return this.httpClient.post(this.BASE_URL+"/login",user);

  }
  getUsers():Observable<any>
  {
  return this.httpClient.get(this.BASE_URL+"/users");
  }
  deleteUser(id:any):Observable<any>
  {
      return this.httpClient.delete(this.BASE_URL+"/user/"+id);
  }

  updateUser(user:UserRegistrationModel,id:any):Observable<any>
  {
      return this.httpClient.put(this.BASE_URL+"/user/"+id,user);
  }

}


