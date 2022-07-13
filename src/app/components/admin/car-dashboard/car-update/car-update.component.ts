import { CarImage } from './../../../../models/carImage';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from './../../../../services/image.service';
import { CarService } from './../../../../services/car.service';
import { BrandService } from './../../../../services/brand.service';
import { ColorService } from './../../../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from './../../../../models/color';
import { Brand } from './../../../../models/brand';
import { Car } from './../../../../models/car';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  brands: Brand[];
  brandsLoaded = false;

  colors: Color[];
  colorsLoaded = false;

  images: CarImage[] = [];
  imagesLoaded = false;

  car: Car;
  carLoaded = false;


  carUpdateForm: FormGroup;


  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig,

  ) { }

  ngOnInit(): void {
    this.getCar()
    this.getColors()
    this.getBrands()
  }

  getCar() {
    this.carService.getCarById(this.config.data.id).subscribe(result => {
      if (result.success) {
        this.car = result.data
        this.createCarUpdateForm()
        this.getImages()
        this.carLoaded = true
      }
    });
  }

  getImages() {
    this.imageService.getImagesByCarId(this.car.id).subscribe(result => {
      if (result.success) {
        this.images = result.data
        this.imagesLoaded = true
      }
    });
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

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.car.id],
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      model: [this.car.model, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [this.car.description, Validators.required],
      findexScore: [this.car.findexScore, Validators.required],

    });
  }

  updateCar() {
    this.carService.updateCar(this.carUpdateForm.value).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
      }
    });
  }

  deleteImage(image: CarImage) {
    this.imageService.deleteImage(image.id).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getImages()
      }
    });
  }

  uploadImages(event: any) {
    let imagesToUpload = []
    for (const image of event.files) {
      imagesToUpload.push(image)
    }
    this.imageService.uploadImages(imagesToUpload, this.car.id).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getImages()
      }
    });
  }

}
