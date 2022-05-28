import { ErrorService } from './../../services/error.service';
import { BrandService } from './../../services/brand.service';
import { ColorService } from './../../services/color.service';
import { Brand } from './../../models/brand';
import { Color } from './../../models/color';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Car } from './../../models/car';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  dataLoaded = false;
  currentCar: Car
  colors: Color[];
  brands: Brand[];

  carUpdateForm: FormGroup;

  constructor(private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService,
    private errorService: ErrorService) { }




  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getColors();
        this.getBrands();
        this.getCurrentCar(params["carId"])
      }
    })
  }

  getCurrentCar(carId: number) {
    this.carService.getCarById(carId).subscribe(result => {
      if (result.success) {
        this.currentCar = result.data;
        console.log(this.currentCar);
        this.createCarUpdateForm();
        this.dataLoaded = true;
      }
    })
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.currentCar.id, Validators.required],
      dailyPrice: [this.currentCar.dailyPrice, Validators.required],
      description: [this.currentCar.description, Validators.required],
      modelYear: [this.currentCar.modelYear, Validators.required],
      colorId: [this.currentCar.colorId, Validators.required],
      brandId: [this.currentCar.brandId, Validators.required]
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(result => {
      if (result.success) {
        this.colors = result.data;
      }
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(result => {
      if (result.success) {
        this.brands = result.data;
      }
    })
  }

  updateCar() {
    this.carService.updateCar(this.carUpdateForm.value).subscribe(result => {
      if (result.success) {
        this.toastrService.success("Car updated successfully")
        this.router.navigate(["/cars"])
      }
      else {
        this.toastrService.error(result.message)
      }
    }, error => {
      this.errorService.showError(error)
    }
    )
  }


}
