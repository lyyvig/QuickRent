import { FilterOptions } from './../../models/filterOptions';
import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
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
  carsDataLoaded = false;
  cars:CarDetail[] = [];

  brands: Brand[] = [];
  colors: Color[] = [];

  filter:FilterOptions = new FilterOptions();

  constructor(private carService:CarService,
              private  brandService:BrandService,
              private  colorService:ColorService,
              private  activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
    this.getDetails()

  }

  getDetails(){
    this.carService.getDetails().subscribe(result => {
      if(result.success){
        this.cars = result.data
        this.carsDataLoaded = true;
      }
    })
  }

  getDetailsByFilter(){
    let filter = new FilterOptions()
    filter.brandId = this.filter.brandId ? this.filter.brandId : 0;
    filter.colorId = this.filter.colorId ? this.filter.colorId : 0;
    filter.minPrice = this.filter.minPrice ? this.filter.minPrice : 0;
    filter.maxPrice = this.filter.maxPrice ? this.filter.maxPrice : 0;
    filter.minModelYear = this.filter.minModelYear ? this.filter.minModelYear : 0;
    this.carService.getDetailsByFilter(filter).subscribe(result => {
      if(result.success){
        this.cars = result.data
        this.carsDataLoaded = true;
      }
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }



}
