import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColorService } from './../../../services/color.service';
import { Color } from './../../../models/color';
import { Component, OnInit } from '@angular/core';
import { ColorUpdateComponent } from './color-update/color-update.component';
import { ColorAddComponent } from './color-add/color-add.component';

@Component({
  selector: 'app-color-dashboard',
  templateUrl: './color-dashboard.component.html',
  styleUrls: ['./color-dashboard.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ColorDashboardComponent implements OnInit {


  colors: Color[];
  colorsLoaded = false;

  ref: DynamicDialogRef;


  constructor(
    private colorService: ColorService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getColors();
  }


  getColors() {
    this.colorService.getColors().subscribe(
      (result) => {
        if (result.success) {
          this.colors = result.data
          this.colorsLoaded = true;
        }
      }
    )
  }

  addColor() {
    this.ref = this.dialogService.open(ColorAddComponent, {
      header: 'Add Color',
      width: '40%',
      height: '300px',
      contentStyle: { 'overflow': 'auto' }
    });

    this.ref.onClose.subscribe(() => {
      this.getColors();
    }
    )
  }

  deleteColor(color: Color) {
    this.confirmationService.confirm({
      key: color.id.toString(),
      message: `Are you sure you want to delete ${color.name}?`,
      header: 'Delete Color',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.colorService.deleteColor(color).subscribe(
          (result) => {
            if (result.success) {
              this.toastrService.info(result.message,"Delete successful", { timeOut: 10000 });
              this.getColors();
            }
            else {
              this.toastrService.error(result.message, 'Error');
            }
          }
        )
      }
    });
  }

  editColor(color: Color) {
    this.ref = this.dialogService.open(ColorUpdateComponent, {
      header: 'Update ' + color.name,
      width: '40%',
      contentStyle: { 'overflow': 'auto' },
      data: color,

    });

    this.ref.onClose.subscribe(() => {
      this.getColors();
    }
    )
  }


}
