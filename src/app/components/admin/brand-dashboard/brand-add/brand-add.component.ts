import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../../../services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  addBrand(){
    this.brandService.addBrand(this.brandAddForm.value).subscribe(
      (result)=>{
        if(result.success){
          this.toastrService.success(result.message);
          this.createBrandAddForm();
        }
        else {
          this.toastrService.error(result.message)
        }
      }
    )
  }

}
