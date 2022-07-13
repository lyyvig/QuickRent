import { CustomerService } from './../../services/customer.service';
import { AuthService } from './../../services/auth.service';
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
    private customerService: CustomerService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.getCustomer()

  }
  getUser(){
    this.userService.get(this.authService.claims?.userId).subscribe(
      (res) => {
        if (res.success) {
          this.user = res.data;
          this.createUserUpdateForm();
          this.createPasswordUpdateForm();
          this.userLoaded = true;
        }
      });
  }

  getCustomer(){
    this.customerService.get(this.authService.claims?.userId).subscribe(result => {
      console.log(result)
      if(result.success){
        this.customer = result.data
        this.createCustomerUpdateForm()
        this.customerLoaded = true;
      }
    })
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

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      id: [this.customer.id],
      nationalIdentity: [this.customer.nationalIdentity, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
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
    });
  }

  updateCustomer(){
    this.customerService.update(this.customerUpdateForm.value).subscribe((res) => {
      if (res.success) {
        this.toastrService.success(res.message);
      }
    });
  }



}
