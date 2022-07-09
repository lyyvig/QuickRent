import { ImageService } from './../../../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from './../../../../models/color';
import { Brand } from './../../../../models/brand';
import { BrandService } from './../../../../services/brand.service';
import { ColorService } from './../../../../services/color.service';
import { CarService } from './../../../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  brands: Brand[];
  brandsLoaded = false;

  colors: Color[];
  colorsLoaded = false;

  images: any[] = [];


  carAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getColors()
    this.getBrands()
  }

  getBrands() {
    this.brandService.getBrands().subscribe(result => {
      if (result.success) {
        this.brands = result.data
        this.brandsLoaded = true
      }
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(result => {
      if (result.success) {
        this.colors = result.data
        this.colorsLoaded = true
      }
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [0, [Validators.required]],
      colorId: [0, [Validators.required]],
      model: ['', [Validators.required]],
      dailyPrice: [0, [Validators.required]],
      modelYear: [0, [Validators.required]],
      description: ['', [Validators.required]],
      findexScore: [0, [Validators.required]]
    });
  }

  setImages(event: any) {
    this.images = [];
    for (let file of event.files) {
      this.images.push(file);
    }
    let plural = this.images.length > 1 ? 's' : '';
    this.toastrService.success(`${this.images.length} file${plural} selected`);
  }

  addCar() {
    this.carService.addCar(this.carAddForm.value).subscribe(result => {
      if (result.success) {

        this.toastrService.success(result.message)
        if (this.images) {
          this.imageService.uploadImages(this.images, result.data).subscribe(imageResult => {
            if (imageResult.success) {
              this.toastrService.success(imageResult.message);
              this.carAddForm.reset();
              this.images = [];
            }
            else {
              this.toastrService.error(imageResult.message, "Couldn't upload images")
            }
          })
        }
      }
      else {
        this.toastrService.error(result.message)
      }
    });
  }


}
