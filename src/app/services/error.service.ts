import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastrService: ToastrService
  ) { }

  showError(err: any) {
    if (err.error.StatusCode === 422) {
      for (const error of err.error.Errors) {
        this.toastrService.error(error.ErrorMessage, error.PropertyName, { timeOut: 10000 });
      }
    }
    else if( err.error.StatusCode === 401) {
      this.toastrService.error(err.error.Message, 'Error', { timeOut: 5000 });
    }
    else {
      this.toastrService.error("An Unknown Error Occured", 'Error', { timeOut: 10000 });
    }
  }
}
