import { CarImage } from './../../models/carImage';
import { ActivatedRoute } from '@angular/router';
import { CarService } from './../../services/car.service';
import { CarDetail } from './../../models/carDetail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  url = "https://localhost:44357/"
  currentCar: CarDetail;
  dataLoaded = false;
  activePhoto = true;

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["carId"]){
        this.getCurrentCar(params["carId"])
        console.log(this.currentCar)
      }
    })
  }

  getCurrentCar(carId:number){
    this.carService.getCarDetail(carId).subscribe(result => {
      console.log(result)
      if(result.success){
        this.currentCar = result.data;
        this.dataLoaded = true;
      }
    })
  }

  getPhotoClass(image: CarImage){
    if(image == this.currentCar.images[0]){
      return "active carousel-item"
    }
    return "carousel-item"
  }

}
