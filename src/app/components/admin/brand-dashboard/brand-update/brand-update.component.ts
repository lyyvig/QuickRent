import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../../../services/brand.service';
import { Brand } from './../../../../models/brand';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand: Brand;

  brandUpdateForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.getBrand();
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id: [this.brand.id, [Validators.required]],
      name: [this.brand.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  getBrand() {
    this.brand = this.dynamicDialogConfig.data;
  }

  updateBrand() {
    this.brandService.updateBrand(this.brandUpdateForm.value).subscribe(
      (result) => {
        if (result.success) {
          this.toastrService.success(result.message);
        }
        else {
          this.toastrService.error(result.message)
        }
      }
    )
  }


}
