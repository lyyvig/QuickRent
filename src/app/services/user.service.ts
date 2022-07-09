import { ListResponseModel } from './../models/listResponseModel';
import { ChangePasswordModel } from './../models/changePasswordModel';
import { ResponseModel } from './../models/responseModel';
import { ObjectResponseModel } from './../models/objectResponseModel';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel';
import { TokenModel } from './../models/tokenModel';
import { apiUrl } from './serviceConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private serviceUrl = apiUrl + "users/"

  constructor(private httpClient:HttpClient) { }

  updateUser(user:UserModel):Observable<ObjectResponseModel<TokenModel>>{
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.serviceUrl + "update", user);
  }

  changePassword(changePasswordModel: ChangePasswordModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "changepassword", changePasswordModel);
  }

  get(id: number):Observable<ObjectResponseModel<UserModel>>{
    return this.httpClient.get<ObjectResponseModel<UserModel>>(this.serviceUrl + "get?id=" + id);
  }

  getByMail(email: string):Observable<ObjectResponseModel<UserModel>>{
    return this.httpClient.get<ObjectResponseModel<UserModel>>(this.serviceUrl + "getbymail?email=" + email);
  }

  getUsers():Observable<ListResponseModel<UserModel>> {
    return this.httpClient.get<ListResponseModel<UserModel>>(this.serviceUrl + "getusers");
  }

}
