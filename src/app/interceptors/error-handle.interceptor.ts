import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  constructor(private toastrService:ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      map(res => { return res; }),
      catchError((err: HttpErrorResponse) => {
        if (err.error.StatusCode === 422) {
          for (const error of err.error.Errors) { //Validation error (exception)
            this.toastrService.error(error.ErrorMessage, error.PropertyName, { timeOut: 10000 });
          }
        }
        else if( err.error.StatusCode === 401) { // Unauthorized (exception)
          this.toastrService.error(err.error.Message, 'Error', { timeOut: 5000 });
        }
        else { // Other error
          this.toastrService.error(err.error.message,'Error', { timeOut: 5000 });
          throw err;
        }
        return EMPTY;
      }
    ));


  }
}
