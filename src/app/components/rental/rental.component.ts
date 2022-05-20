import { RentalService } from './../../services/rental.service';
import { RentalDetail } from './../../models/rentalDetail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalsWithDetails:RentalDetail[] = [];
  dataLoaded = false;


  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentalsWithDetails()
  }

  getRentalsWithDetails(){
    this.rentalService.getRentalDetails().subscribe(result => {
      if(result.success){
        this.rentalsWithDetails = result.data;
        this.dataLoaded = true;
      }
    })
  }

}
