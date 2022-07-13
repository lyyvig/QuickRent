import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  isLoggedIn(): boolean{
    return this.authService.isLoggedIn;
  }

  isAdmin(): boolean{
    return this.authService.isAdmin;
  }

  getFullName() {
    return this.authService.claims.fullName;
  }

  logOut() {
    this.authService.logout();

  }


}
