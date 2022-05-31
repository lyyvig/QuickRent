import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { BrandService } from './../../services/brand.service';
import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [0, Validators.required],
      colorId: [0, Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe(
      result => {
        if (result.success) {
          this.brands = result.data;
        }
      }
    );
  }
  getColors() {
    this.colorService.getColors().subscribe(
      result => {
        if (result.success) {
          this.colors = result.data;
        }
      }
    );
  }

  addCar() {
    if (this.carAddForm.valid) {
      this.carService.addCar(this.carAddForm.value).subscribe(result => {
        if (result.success) {
          this.toastrService.success('Car added successfully.');
          this.carAddForm.reset();
        }
        else {
          this.toastrService.error(result.message);
        }
      });
    }
    else {
      this.toastrService.error('Please fill all the required fields.');
    }


  }
}
