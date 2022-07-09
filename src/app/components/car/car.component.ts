import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterOptions } from './../../models/filterOptions';
import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carsDataLoaded = false;
  cars: CarDetail[] = [];


  filterForm: FormGroup;

  brands: Brand[] = [];
  colors: Color[] = [];


  constructor(private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

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
        this.carsDataLoaded = true;
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
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }



}
