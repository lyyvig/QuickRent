import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandService } from './../../../services/brand.service';
import { Brand } from './../../../models/brand';
import { Component, OnInit } from '@angular/core';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandUpdateComponent } from './brand-update/brand-update.component';

@Component({
  selector: 'app-brand-dashboard',
  templateUrl: './brand-dashboard.component.html',
  styleUrls: ['./brand-dashboard.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class BrandDashboardComponent implements OnInit {

  brands: Brand[];
  brandsLoaded = false;

  ref: DynamicDialogRef;


  constructor(
    private brandService: BrandService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }


  getBrands() {
    this.brandService.getBrands().subscribe(
      (result) => {
        if (result.success) {
          this.brands = result.data
          this.brandsLoaded = true;
        }
      }
    )
  }

  addBrand() {
    this.ref = this.dialogService.open(BrandAddComponent, {
      header: 'Add Brand',
      width: '40%',
      height: '300px',
      contentStyle: { 'overflow': 'auto' }
    });

    this.ref.onClose.subscribe(() => {
      this.getBrands();
    }
    )
  }

  deleteBrand(brand: Brand) {
    this.confirmationService.confirm({
      key: brand.id.toString(),
      message: `Are you sure you want to delete ${brand.name}?`,
      header: 'Delete Brand',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.brandService.deleteBrand(brand).subscribe(
          (result) => {
            if (result.success) {
              this.toastrService.info(result.message,"Delete successful", { timeOut: 10000 });
              this.getBrands();
            }
            else {
              this.toastrService.error(result.message, 'Error');
            }
          }
        )
      }
    });
  }

  editBrand(brand: Brand) {
    this.ref = this.dialogService.open(BrandUpdateComponent, {
      header: 'Update ' + brand.name,
      width: '40%',
      contentStyle: {'overflow': 'auto' },
      data: brand,

    });

    this.ref.onClose.subscribe(() => {
      this.getBrands();
    }
    )
  }





}
