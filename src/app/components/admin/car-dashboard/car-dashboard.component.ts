import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { CarService } from './../../../services/car.service';
import { CarDetail } from './../../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CarAddComponent } from './car-add/car-add.component';
import { CarUpdateComponent } from './car-update/car-update.component';

@Component({
  selector: 'app-car-dashboard',
  templateUrl: './car-dashboard.component.html',
  styleUrls: ['./car-dashboard.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class CarDashboardComponent implements OnInit {


  cars:CarDetail[]
  carsLoaded=false;

  ref: DynamicDialogRef;


  constructor(
    private carService:CarService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getDetails().subscribe(
      (result)=>{
        if(result.success){
          this.cars = result.data
          this.carsLoaded=true;
        }
      }
    )
  }



  getCarStats(car: CarDetail){
    this.carService.getCarStats(car.id).subscribe(
      (result)=>{
        if(result.success){
          this.toastrService.info(`${car.brandName} ${car.model} has been rented ${result.data.totalRentals} times. Total income is ${result.data.totalIncome}`,
          'Car Stats', {timeOut: 10000});
        }
      }
    )
  }

  addCar(){
    this.ref = this.dialogService.open(CarAddComponent, {
      header: 'Add Car',
      width: '70%',
      contentStyle: { 'min-height': '300px', 'overflow': 'auto' }
    });

    this.ref.onClose.subscribe(() => {
      this.getCars();
    });


  }

  editCar(car: CarDetail){
    this.ref = this.dialogService.open(CarUpdateComponent, {
      header: 'Update Car',
      width: '70%',
      contentStyle: { 'min-height': '300px', 'overflow': 'auto' },
      data: car,

    });

    this.ref.onClose.subscribe(() => {
      this.getCars();
    });
  }

  deleteCar(car: CarDetail){
    let carName = car.brandName + " " + car.model;
    this.confirmationService.confirm({
      key: car.id.toString(),
      message: 'Are you sure that you want to delete ' + carName + '?',
      accept: () => {
        this.carService.deleteCar(car.id).subscribe(
          (result)=>{
            if(result.success){
              this.toastrService.success(result.message,"Delete successful", );
              this.getCars();
            }
          }
        )
      }
    });
  }



}
