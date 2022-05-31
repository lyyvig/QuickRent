import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../services/customer.service';
import { UserService } from './../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Customer } from './../../models/customer';
import { UserUpdateModel } from './../../models/userUpdateModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserUpdateModel;
  userLoaded = false;
  customer: Customer;
  customerLoaded = false;

  userUpdateForm: FormGroup;
  customerUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.authService.getClaims()?.userId
    if (id) {
      this.userService.get(id).subscribe(
        (res) => {
          if (res.success) {
            this.user = res.data;
            this.userLoaded = true;
            this.createUserUpdateForm();
          }
          else {
            this.toastrService.error(res.message);
          }
        });
      this.customerService.get(id).subscribe((res) => {
        if (res.success) {
          this.customer = res.data;
          this.customerLoaded = true;
          this.createCustomerUpdateForm();
        }
        else {
          this.toastrService.error(res.message);
        }
      });
    }

  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      companyName: [this.customer.companyName ? this.customer.companyName : "", Validators.required],
      nationalIdentity: [this.customer.nationalIdentity ? this.customer.nationalIdentity: "", Validators.required]
    });
  }

  updateUser() {
    console.log(this.userUpdateForm.value);
  }

  updateCustomer() {
    console.log(this.customerUpdateForm.value);
  }

}
