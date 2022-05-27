import { Rental } from './../../models/rental';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from './../../services/rental.service';
import { CreditCard } from './../../models/creditCard';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {

  monthOptions: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  yearOptions: string[] = [];

  creditCard: CreditCard;

  expireMonth: string
  expireYear: string
  cvc: string
  cardNumber: string


  constructor(private router: Router, private orderService: OrderService, private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    if (!this.orderService.getRental()) {
      this.router.navigate(["/"])
    }
    this.yearOptions = this.getYearOptions();
    this.expireMonth= this.monthOptions[0];
    this.expireYear = this.yearOptions[0];
    this.cvc = ''
    this.cardNumber = '';
  }

  getYearOptions(): string[] {
    let currentYear = new Date().getFullYear();
    let options: string[] = [];
    for (let i = 0; i < 10; i++) {
      options.push(String(currentYear + i).substring(2, 4));
    }
    return options;
  }

  Order() {
    this.creditCard = { cardNumber: this.cardNumber, expireYear: this.expireYear, expireMonth: this.expireMonth, cvc: this.cvc };
    this.rentalService.rent(this.orderService.getRental(), this.creditCard).subscribe(result => {
      if (result.success) {
        this.toastrService.success("Order Successful", "Success");
        this.router.navigate(['/'])


      }
      else {
        this.toastrService.error(result.message, "Error");
      }
     });
  }

  ValidateCreditCard(): boolean {
    if (this.cardNumber.length != 16) {
      return false;
    }
    if (this.cvc.length != 3) {
      return false;
    }
    if (isNaN(+this.cardNumber)) {
      return false;
    }
    if (isNaN(+this.cvc)) {
      return false;
    }
    return true;
  }

  setOrder(){

  }


}
