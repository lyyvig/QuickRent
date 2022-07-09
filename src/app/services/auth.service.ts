import { ToastrService } from 'ngx-toastr';
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
  private tokenExp = 0;

  claims: Claims;
  isAdmin = false;

  private _isLoggedIn = false


  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private toastrService: ToastrService, private router: Router) {
    if (this.getToken()) {
      this._isLoggedIn = true;
      this.getClaims()
      this.getTokenExp()
      this.getIsAdmin()

    }
  }

  get isLoggedIn() {
    if (this._isLoggedIn && this.tokenExp < Date.now() / 1000) {
      this.logout()
      this.toastrService.info("Token expired, please login again.")
    }
    return this._isLoggedIn
  }

  set isLoggedIn(value) {
    this._isLoggedIn = value
  }


  register(registerModel: RegisterModel) {
    this.httpClient.post<ObjectResponseModel<TokenModel>>(this.serviceUrl + "register", registerModel).subscribe(
      (res) => {
        if (res.success) {
          this.localStorageService.setItem('token', res.data.token);
          this._isLoggedIn = true;
          this.getClaims()
          this.getTokenExp()
          this.getIsAdmin()
          this.toastrService.success("Register successful");
          this.router.navigate(['/']);
        }
        else {
          this.toastrService.error(res.message);
        }
      });
  }

  login(loginModel: LoginModel) {
    this.httpClient.post<ObjectResponseModel<TokenModel>>(this.serviceUrl + "login", loginModel).subscribe(
      (res) => {
        if (res.success) {
          this.localStorageService.setItem('token', res.data.token);
          this._isLoggedIn = true;
          this.getClaims()
          this.getTokenExp()
          this.getIsAdmin()

          this.toastrService.success("Login successful");
          this.router.navigate(['/']);
        }
        else {
          this.toastrService.error(res.message)
        }
      }
    )
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this._isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/']);
  }



  private getClaims() {
    let token = this.getToken();
    let tokenAttributes = this.getTokenAttributes(token);
    if (tokenAttributes) {
      let claims: Claims = {
        userId: tokenAttributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        email: tokenAttributes['email'],
        fullName: tokenAttributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        roles: tokenAttributes['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
      this.claims = claims;
    }
  }


  private getIsAdmin() {
    if (this.claims.roles)
      if (this.claims.roles.includes('admin'))
        this.isAdmin = true;
      else
        this.isAdmin = false;
    else
      this.isAdmin = false;
  }

  private getTokenExp() {
    let token = this.getToken();
    let tokenAttributes = this.getTokenAttributes(token);
    if (tokenAttributes) {
      this.tokenExp = tokenAttributes.exp
    }
  }

  private getToken(): any {
    let token = this.localStorageService.getItem('token');
    return token;
  }


  private getTokenAttributes(token: string): any {
    if (token) {
      let tokenData = token.split('.')[1]
      return JSON.parse(decodeURIComponent(atob(tokenData).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
    }
    return null;
  }



}
