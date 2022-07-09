import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from './../../../../models/color';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color: Color;

  colorUpdateForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.getColor();
    this.createColorUpdateForm();
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.color.id, [Validators.required]],
      name: [this.color.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  getColor() {
    this.color = this.dynamicDialogConfig.data;
  }

  updateColor() {
    this.colorService.updateColor(this.colorUpdateForm.value).subscribe(
      (result) => {
        if (result.success) {
          this.toastrService.success(result.message);
        }
        else {
          this.toastrService.error(result.message);
        }
      }
    )
  }
}
