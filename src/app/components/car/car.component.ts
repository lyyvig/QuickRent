import { CarRentComponent } from './../car-rent/car-rent.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [DialogService]
})
export class CarComponent implements OnInit {

  carsLoaded = false;
  cars: CarDetail[] = [];


  filterForm: FormGroup;

  brands: Brand[] = [];
  brandsLoaded = false;
  colors: Color[] = [];
  colorsLoaded = false;


  ref: DynamicDialogRef


  constructor(private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
    this.getDetails()
    this.createFilterForm()


  }


  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      brandId: [null],
      colorId: [null],
      minPrice: [null],
      maxPrice: [null],
      minModelYear: [null]
    })
  }

  getDetails() {
    this.carService.getDetails().subscribe(result => {
      if (result.success) {
        this.cars = result.data
        this.carsLoaded = true;
      }
    })
  }

  getDetailsByFilter() {

    this.carService.getDetailsByFilter(this.filterForm.value).subscribe(response => {
      if (response.success) {
        this.cars = response.data
      }
    })

  }

  clear(){
    this.filterForm.reset()
    this.getDetails()
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.brandsLoaded = true;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.colorsLoaded = true;
    })
  }

  rent(car:CarDetail){
    this.ref = this.dialogService.open(CarRentComponent, {
      header: 'Rent Car',
      width: '70%',
      contentStyle: { 'overflow': 'auto' },
      data: car
    });
  }



}
