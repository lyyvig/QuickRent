import { ErrorService } from './../../services/error.service';
import { Brand } from './../../models/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brands: Brand[];

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.getBrands();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  updateBrand(){
    this.brandService.updateBrand(this.brandUpdateForm.value).subscribe(
      res => {
        if(res.success){
          this.toastrService.success("Brand updated successfully", "Success");
          this.getBrands();
          this.brandUpdateForm.reset();
        }
        else { this.toastrService.error(res.message, 'Error'); }
      },
      (err) => {
        this.errorService.showError(err);
      }
    );
  }

  getBrands(){
    this.brandService.getBrands().subscribe(
      res => {
        if(res.success){
          this.brands = res.data;
        }
        else { this.toastrService.error(res.message, 'Error'); }
      });
  }



}
