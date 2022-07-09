import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Customer } from './../../models/customer';
import { UserModel } from '../../models/userModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  disabled: boolean = true;


  user: UserModel;
  userLoaded = false;
  customer: Customer;
  customerLoaded = false;

  userUpdateForm: FormGroup;
  passwordUpdateForm: FormGroup;
  customerUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.authService.claims?.userId
    if (id) {
      this.userService.get(id).subscribe(
        (res) => {
          if (res.success) {
            this.user = res.data;
            this.userLoaded = true;
            this.createUserUpdateForm();
            this.createPasswordUpdateForm();
          }
          else {
            this.toastrService.error(res.message);
          }
        });
    }

  }

  createPasswordUpdateForm() {
    this.passwordUpdateForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }


  updatePassword() {
    this.userService.changePassword(this.passwordUpdateForm.value).subscribe((res) => {
      if (res.success) {
        this.toastrService.success(res.message);
      }
      else {
        this.toastrService.error(res.message);
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.userUpdateForm.value).subscribe((res) => {
      if (res.success) {
        this.toastrService.success(res.message);
      }
      else {
        this.toastrService.error(res.message);
      }
    });
  }



}
