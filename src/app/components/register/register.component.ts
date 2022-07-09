import { RegisterModel } from './../../models/registerModel';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {
    console.log(this.registerForm.value);
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.toastrService.error('Passwords do not match');
      return;
    }
    let registerModel: RegisterModel = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.authService.register(registerModel)
  }

}
