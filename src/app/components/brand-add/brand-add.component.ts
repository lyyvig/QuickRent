import { ErrorService } from './../../services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService
  ) { }


  ngOnInit(): void {
    this.createBrandAddForm();

  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      this.brandService.addBrand(this.brandAddForm.value).subscribe(
        (res) => {
          if (res.success) {
            this.toastrService.success('Brand Added Successfully', this.brandAddForm.value.name);
            this.brandAddForm.reset();
          }
          else {
            this.toastrService.error(res.message, this.brandAddForm.value.name);
          }
        },
        (err) => {
          this.errorService.showError(err);
        }
      );
    }
    else {
      this.toastrService.error('Please fill all the required fields');
    }
  }
}
