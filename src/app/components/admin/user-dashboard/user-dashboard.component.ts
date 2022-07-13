import { UserModel } from './../../../models/userModel';
import { ClaimComponent } from './claim/claim.component';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [DialogService]
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private userService:UserService,
    private dialogService: DialogService
  ) { }

  users: UserModel[];
  usersLoaded = false;

  ref: DynamicDialogRef;

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

  claims(user: UserModel){
    this.ref = this.dialogService.open(ClaimComponent, {
      header: 'Claims of ' + user.firstName + " " + user.lastName,
      width: '40%',
      contentStyle: { 'min-height':'300px', 'overflow': 'auto' },
      data: user,

    });
  }


}
