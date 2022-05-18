import { CarService } from './../../../services/car.service';
import { CarDetail } from './../../../models/carDetail';
import { Car } from './../../../models/car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  dataLoaded = false;
  cars :Car[] = [];
  carsWithDetails:CarDetail[] = [];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getDetails()
  }

  getCars(){
    this.carService.getCars().subscribe(result => {
      if(result.success){
        this.cars = result.data
      }
    })
  }
  getDetails(){
    this.carService.getDetails().subscribe(result => {
      if(result.success){
        this.carsWithDetails = result.data
      }
    })
  }

}
