import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)

  }

}
