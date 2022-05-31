import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Claims } from 'src/app/models/claims';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  claims: Claims;
  isAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isLoggedIn.subscribe(x => {
      var claims = this.authService.getClaims();
      if (claims) {
        this.claims = claims;
        if (this.claims.roles.includes('admin'))
          this.isAdmin = true;
        else
          this.isAdmin = false;
      }
      else
        this.isAdmin = false;
    });
  }

  a() {
    this.isLoggedIn.subscribe(x => console.log(x));
  }

  logOut() {
    this.authService.logout();

  }


}
