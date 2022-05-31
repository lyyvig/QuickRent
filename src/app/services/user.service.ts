import { ObjectResponseModel } from './../models/objectResponseModel';
import { Observable } from 'rxjs';
import { UserUpdateModel } from './../models/userUpdateModel';
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

  updateUser(user:UserUpdateModel):Observable<ObjectResponseModel<TokenModel>>{
    return this.httpClient.put<ObjectResponseModel<TokenModel>>(this.serviceUrl + "update", user);
  }

  get(id: number):Observable<ObjectResponseModel<UserUpdateModel>>{
    return this.httpClient.get<ObjectResponseModel<UserUpdateModel>>(this.serviceUrl + "get?id=" + id);
  }

  getByMail(email: string):Observable<ObjectResponseModel<UserUpdateModel>>{
    return this.httpClient.get<ObjectResponseModel<UserUpdateModel>>(this.serviceUrl + "getbymail?email=" + email);
  }

}
