import { CarRentComponent } from './components/car-rent/car-rent.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"car/:carId", component:CarDetailComponent},
  {path:"rent", component:CarRentComponent},
  {path:"cars", component:CarComponent},
  {path:"customers", component:CustomerComponent},
  {path:"rentals", component:RentalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
