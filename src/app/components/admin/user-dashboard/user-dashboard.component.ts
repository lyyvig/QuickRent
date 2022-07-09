import { UserService } from './../../../services/user.service';
import { UserModel } from '../../../models/userModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private userService:UserService,
  ) { }

  users: UserModel[];
  usersLoaded = false;

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.userService.getUsers().subscribe(result => {
      if(result.success){
        this.users = result.data;
        this.usersLoaded = true;
      }
    });
  }

  claims(){

  }


}
