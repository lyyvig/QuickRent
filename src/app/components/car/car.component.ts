import { backendUrl } from './../../services/serviceConstants';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  url = backendUrl;
  dataLoaded = false;
  carsWithDetails:CarDetail[] = [];

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getDetailsByBrandId(params["brandId"])
      }
      else if(params["colorId"]){
        this.getDetailsByColorId(params["colorId"])
      }
      else{
        this.getDetails()
      }
    })
  }

  getDetails(){
    this.carService.getDetails().subscribe(result => {
      if(result.success){
        this.carsWithDetails = result.data
        this.dataLoaded = true;
      }
    })
  }

  getDetailsByBrandId(brandId:number){
    this.carService.getDetailsByBrandId(brandId).subscribe(result => {
      if(result.success){
        this.carsWithDetails = result.data
        this.dataLoaded = true;
      }
    })
  }

  getDetailsByColorId(colorId:number) {
    this.carService.getDetailsByColorId(colorId).subscribe(result => {
      if(result.success){
        this.carsWithDetails = result.data
        this.dataLoaded = true;
      }
    })
  }



}
