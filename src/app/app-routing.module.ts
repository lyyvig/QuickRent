import { RentalDashboardComponent } from './components/admin/rental-dashboard/rental-dashboard.component';
import { UserDashboardComponent } from './components/admin/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';



import { ColorDashboardComponent } from './components/admin/color-dashboard/color-dashboard.component';
import { BrandDashboardComponent } from './components/admin/brand-dashboard/brand-dashboard.component';
import { CarDashboardComponent } from './components/admin/car-dashboard/car-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { NotLoginGuard } from './guards/not-login.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "car/:carId", component: CarDetailComponent },
  { path: "login", component: LoginComponent, canActivate: [NotLoginGuard] },
  { path: "register", component: RegisterComponent, canActivate: [NotLoginGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [LoginGuard] },
  {
    path: "admin", component: AdminComponent, canActivate: [LoginGuard, AdminGuard], children: [
      {
        path: "cars", component: CarDashboardComponent
      },
      {
        path: "brands", component: BrandDashboardComponent
      },
      {
        path: "colors", component: ColorDashboardComponent
      },
      {
        path: "users", component: UserDashboardComponent
      },
      {
        path: "rentals", component: RentalDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
