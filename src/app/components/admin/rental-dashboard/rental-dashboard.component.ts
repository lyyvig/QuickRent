import { RentalService } from './../../../services/rental.service';
import { RentalDetail } from './../../../models/rentalDetail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-dashboard',
  templateUrl: './rental-dashboard.component.html',
  styleUrls: ['./rental-dashboard.component.css']
})
export class RentalDashboardComponent implements OnInit {


  rentals:RentalDetail[] = [];
  rentalsLoaded = false;

  constructor(
    private rentalService:RentalService,

  ) { }

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals(){
    this.rentalService.getRentalDetails().subscribe(result => {
      if(result.success){
        this.rentals = result.data
        this.rentalsLoaded = true
      }
    })
  }

}
