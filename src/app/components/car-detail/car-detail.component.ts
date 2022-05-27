import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RentalService } from './../../services/rental.service';
import { Rental } from './../../models/rental';
import { OrderService } from './../../services/order.service';
import { CarImage } from './../../models/carImage';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private carService: CarService,
    private orderService: OrderService,
    private rentalService: RentalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) { }


  rentDate: string = "";
  returnDate: string = "";


  minDate: Date;

  ngOnInit(): void {
    this.minDate = new Date()
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCurrentCar(params["carId"])
      }
    })
  }

  getCurrentCar(carId: number) {
    this.carService.getCarDetail(carId).subscribe(result => {
      if (result.success) {
        this.currentCar = result.data;
        this.dataLoaded = true;
      }
    })
  }

  checkIfDateSuitable(){
    if(this.rentDate && this.returnDate){

    }
  }

  setOrder() {
    let rental:Rental = { id: 0, carId: this.currentCar.id, customerId: 2, rentDate: new Date(this.rentDate), returnDate: new Date(this.returnDate) }
    if(rental.rentDate > rental.returnDate){
      this.toastrService.error("Return date must be after rent date")
      return;
    }
    this.rentalService.checkIfIntervalEmpty(rental).subscribe(result => {result
      if(result.data){
        this.orderService.set(rental)
        this.router.navigate(["/rent"])
      }
      else{
        this.toastrService.error("Interval is not empty")
      }
    });

  }



  getPhotoClass(image: CarImage) {
    if (image == this.currentCar.images[0]) {
      return "active carousel-item"
    }
    return "carousel-item"
  }

}
