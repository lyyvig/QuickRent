import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  addColor(){
    this.colorService.addColor(this.colorAddForm.value).subscribe(
      (result)=>{
        if(result.success){
          this.toastrService.success(result.message);
          this.createColorAddForm();
        }
        else {
          this.toastrService.error(result.message)
        }
      }
    )
  }

}
