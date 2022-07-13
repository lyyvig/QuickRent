import { AuthService } from './../../services/auth.service';
import { Rental } from './../../models/rental';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCard } from './../../models/creditCard';
import { Router } from '@angular/router';
import { RentalService } from './../../services/rental.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {

  rentDate: Date;
  returnDate?: Date;

  today: Date;
  maxDate: Date;
  maxReturnDate: Date;

  invalidDates: Date[]
  invalidDatesLoaded = false

  confirmed = false;

  totalRentDays:number;
  totalRentPrice:number;

  creditCardForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.router.navigate(["/"]);
      this.ref.close()
      this.toastrService.info("You need to login to rent a car")
    }

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); //Reset todays time to midnight

    this.maxDate = new Date()
    this.maxDate.setDate(this.today.getDate() + 30)

    this.maxReturnDate = new Date(this.maxDate)

    this.getOccupiedDates()

    this.createCreditCardForm()
  }

  getOccupiedDates() {
    this.rentalService.getOccupiedDates(this.config.data.id).subscribe(result => {
      if (result.success) {
        this.invalidDates = result.data.map(d => new Date(d));
        this.invalidDates.push(this.today)
        this.invalidDatesLoaded = true
      }
    })
  }

  rentDaySelect(event: any) {// this function is for disabling dates in return date calendar
    this.returnDate = undefined; // resets the return date to prevent bugs
    let i = 0;
    for (; i < this.invalidDates.length; i++) { //checks if there is an occupied date after rent day
      if (this.rentDate < this.invalidDates[i])
        break;
    }
    if (i == this.invalidDates.length) { //if there is not an occupied date sets max return day to 30 days later
      this.maxReturnDate = new Date(this.maxDate)
      return
    } //if there is sets max return day to 1 day before of occupied day
    this.maxReturnDate = new Date(this.invalidDates[i])
    this.maxReturnDate.setDate(this.maxReturnDate.getDate() - 1)
  }

  next() {
    if (!this.rentDate) {
      this.toastrService.error("Please select rent date.");
    }
    else if (this.rentDate.getTime() == this.today.getTime()) {
      this.toastrService.error("You cannot rent the car today!");
    }
    else if (!this.returnDate) {
      this.toastrService.error("Please select return date.");
    }
    else {
      this.confirmed = true
      const diffTime = this.returnDate.getTime() - this.rentDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalRentDays = diffDays + 1
      this.totalRentPrice = this.totalRentDays * this.config.data.dailyPrice
      console.log(this.totalRentPrice)
    }

  }

  back() {
    this.confirmed = false
  }

  confirm() {
    if (!this.returnDate) {
      this.toastrService.error("Please select a valid return date")
      return
    }
    let date = this.creditCardForm.value.date.split("/")
    let card: CreditCard = {
      cardHolderName: this.creditCardForm.value.cardHolderName,
      cardNumber: this.creditCardForm.value.cardNumber,
      cvc: this.creditCardForm.value.cvc,
      expireMonth: date[0],
      expireYear: date[1],
    }

    let rental: Rental = {
      id: 0,
      carId: parseInt(this.config.data.id),
      customerId: this.authService.claims.userId,
      rentDate: this.rentDate,
      returnDate: this.returnDate
    }

    this.rentalService.rent(rental, card).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message)
        this.ref.close()
      }
      else {
        this.toastrService.error(result.message)
      }
    });
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardHolderName: ["", [Validators.required]],
      date: ["", [Validators.required]],
      cvc: ["", [Validators.required]],
      cardNumber: ["", [Validators.required]]
    })
  }





}
