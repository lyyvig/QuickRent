import { ErrorService } from './../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addColor() {
    if (this.colorAddForm.valid) {
      this.colorService.addColor(this.colorAddForm.value).subscribe(
        (res) => {
          if (res.success) {
            this.toastrService.success('Color Added Successfully', this.colorAddForm.value.name);
            this.colorAddForm.reset();
          }
          else {
            this.toastrService.error(res.message, this.colorAddForm.value.name);
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
