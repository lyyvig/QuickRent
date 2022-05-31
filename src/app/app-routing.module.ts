import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { NotLoginGuard } from './guards/not-login.guard';
import { DemoComponent } from './components/demo/demo.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"demo", component:DemoComponent},
  {path:"cars", component:CarComponent},
  {path:"car/:carId", component:CarDetailComponent},
  {path:"car/update/:carId", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"rent", component:CarRentComponent, canActivate:[LoginGuard]},
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/update", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/update", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"customers", component:CustomerComponent, canActivate:[LoginGuard]},
  {path:"rentals", component:RentalComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent, canActivate:[NotLoginGuard]},
  {path:"register", component:RegisterComponent, canActivate:[NotLoginGuard]},
  {path:"profile", component:ProfileComponent, canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
