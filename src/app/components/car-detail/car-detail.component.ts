import { CarRentComponent } from './../car-rent/car-rent.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { backendUrl } from './../../services/serviceConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from './../../services/car.service';
import { CarDetail } from './../../models/carDetail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [DialogService]
})
export class CarDetailComponent implements OnInit {


  url = backendUrl
  currentCar: CarDetail;
  dataLoaded = false;

  attributes: any[] = []

  ref: DynamicDialogRef;

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
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
        this.getAttributes()
        this.dataLoaded = true;
      }
    })
  }

  getAttributes(){
    this.attributes.push({key: "Brand", value: this.currentCar.brandName})
    this.attributes.push({key: "Model", value: this.currentCar.model})
    this.attributes.push({key: "Color", value: this.currentCar.colorName})
    this.attributes.push({key: "Year", value: this.currentCar.modelYear})
    this.attributes.push({key: "Daily Price", value: this.currentCar.dailyPrice + '$'})
  }



  // setOrder() {
  //   let rental:Rental = { id: 0, carId: this.currentCar.id, customerId: 2, rentDate: new Date(this.rentDate), returnDate: new Date(this.returnDate) }
  //   if(rental.rentDate > rental.returnDate){
  //     this.toastrService.error("Return date must be after rent date")
  //     return;
  //   }
  //   this.rentalService.checkIfIntervalEmpty(rental).subscribe(result => {result
  //     if(result.data){
  //       this.orderService.set(rental)
  //       this.router.navigate(["/rent"])
  //     }
  //     else{
  //       this.toastrService.error("Interval is not empty")
  //     }
  //   });

  // }

  rent(){
    this.ref = this.dialogService.open(CarRentComponent, {
      header: 'Rent Car',
      width: '70%',
      contentStyle: { 'overflow': 'auto' },
      data: this.currentCar
    });

    this.ref.onClose.subscribe(() => {
    });
  }

}
