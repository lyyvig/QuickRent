import { CarAddComponent } from './components/admin/car-dashboard/car-add/car-add.component';
import { ErrorHandleInterceptor } from './interceptors/error-handle.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { TableModule } from 'primeng/table';
import { AdminComponent } from './components/admin/admin.component';
import { CarDashboardComponent } from './components/admin/car-dashboard/car-dashboard.component';
import { ColorDashboardComponent } from './components/admin/color-dashboard/color-dashboard.component';
import { BrandDashboardComponent } from './components/admin/brand-dashboard/brand-dashboard.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CarUpdateComponent } from './components/admin/car-dashboard/car-update/car-update.component';
import { ApiImagePipe } from './pipes/api-image.pipe';
import { CarouselModule } from 'primeng/carousel';
import { BrandAddComponent } from './components/admin/brand-dashboard/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/admin/brand-dashboard/brand-update/brand-update.component';
import { ColorAddComponent } from './components/admin/color-dashboard/color-add/color-add.component';
import { ColorUpdateComponent } from './components/admin/color-dashboard/color-update/color-update.component';
import { TimelineModule } from 'primeng/timeline';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { UserDashboardComponent } from './components/admin/user-dashboard/user-dashboard.component';
import { RentalDashboardComponent } from './components/admin/rental-dashboard/rental-dashboard.component';
import { ClaimComponent } from './components/admin/user-dashboard/claim/claim.component';
import { FieldsetModule } from 'primeng/fieldset';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    CarDetailComponent,
    CarRentComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    CarDashboardComponent,
    ColorDashboardComponent,
    BrandDashboardComponent,
    CarAddComponent,
    ApiImagePipe,
    BrandAddComponent,
    BrandUpdateComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    UserDashboardComponent,
    RentalDashboardComponent,
    ClaimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    CardModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ListboxModule,
    AccordionModule,
    SliderModule,
    CheckboxModule,
    GalleriaModule,
    TableModule,
    PanelMenuModule,
    DynamicDialogModule,
    FileUploadModule,
    InputTextareaModule,
    ConfirmDialogModule,
    CarouselModule,
    TimelineModule,
    CalendarModule,
    InputMaskModule,
    FieldsetModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
