import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token
        }
      });

    }
    return next.handle(request);
  }
}
