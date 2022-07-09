import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements CanActivate {
  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
      this.toastrService.error("You are already logged in");
      return false;
    }
    else {
      return true;
    }


  }

}
