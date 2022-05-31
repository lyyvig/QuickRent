import { Color } from './../../models/color';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  colors: Color[];

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }


  ngOnInit(): void {
    this.createColorUpdateForm();
    this.getColors();
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }



  updateColor() {
    if (this.colorUpdateForm.valid) {
      this.colorService.updateColor(this.colorUpdateForm.value).subscribe(
        res => {
          if (res.success) {
            this.toastrService.success('Color updated successfully', this.colorUpdateForm.value.name);
            this.colorUpdateForm.reset();
            this.getColors();
          }
          else {
            this.toastrService.error(res.message, this.colorUpdateForm.value.name);
          }
        });
    }
    else {
      this.toastrService.error('Please fill all the required fields');
    }
  }

  getColors() {
    this.colorService.getColors().subscribe(
      res => {
        if (res.success) {
          this.colors = res.data;
        }
        else {
          this.toastrService.error(res.message);
        }
      });
  }

}
