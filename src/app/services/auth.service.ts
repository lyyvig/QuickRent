import { RegisterModel } from './../models/registerModel';
import { Router } from '@angular/router';
import { Claims } from 'src/app/models/claims';
import { LocalStorageService } from './local-storage.service';
import { ObjectResponseModel } from './../models/objectResponseModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenModel } from './../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl = apiUrl + "auth/"

  loggedIn = new BehaviorSubject<boolean>(this.isTokenValid());


  constructor(private httpClient: HttpClient, private localStorageService:LocalStorageService, private router:Router) { }


  register(registerModel: RegisterModel): Observable<ObjectResponseModel<TokenModel>> {
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.serviceUrl + "register", registerModel);
  }

  login(signInModel: LoginModel): Observable<ObjectResponseModel<TokenModel>> {
    return this.httpClient.post<ObjectResponseModel<TokenModel>>(this.serviceUrl + "login", signInModel);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }



  getClaims(): Claims | null {
    let token = this.getToken();
    let tokenAttributes = this.getTokenAttributes(token);
    if (tokenAttributes) {
      let claims: Claims = {
        userId: tokenAttributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        email: tokenAttributes['email'],
        fullName: tokenAttributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        roles: tokenAttributes['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
      return claims;
    }
    return null;
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  private isTokenValid(): boolean {
    let token = this.getToken();
    let tokenAttributes = this.getTokenAttributes(token);
    if (tokenAttributes) {
      if(tokenAttributes.exp > Date.now()/1000)
        return true;
      else{
        this.logout();
        return false;
      }

    }
    return false;
  }

  private getToken(): any {
    let token = this.localStorageService.getItem('token');
    return token;
  }


  private getTokenAttributes(token: string): any {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }



}
