import { Brand } from './../../../models/brand';
import { BrandService } from './../../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  dataLoaded = false;
  brands: Brand[] = []
  currentBrand?: Brand;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {

    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((result) => {
      if (result.success) {
        this.brands = result.data;
        this.dataLoaded = true;
      }
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;

  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return "list-group-item active";
    }
    return "list-group-item";
  }

  setAllBrand() {
    this.currentBrand = undefined;

  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active text-center";
    }
    return "list-group-item text-center";
  }



}
