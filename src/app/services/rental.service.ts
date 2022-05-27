import { ResponseModel } from './../models/responseModel';
import { CreditCard } from './../models/creditCard';
import { ObjectResponseModel } from './../models/objectResponseModel';
import { Rental } from './../models/rental';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';
import { RentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private serviceUrl = apiUrl + "rentals/"

  constructor(private httpClient: HttpClient) { }

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.serviceUrl + "getdetails")
  }
  checkIfIntervalEmpty(rental:Rental): Observable<ObjectResponseModel<boolean>>{
    return this.httpClient.post<ObjectResponseModel<boolean>>(this.serviceUrl + "checkifintervalempty", rental)
  }

  rent(rental:Rental, creditCard:CreditCard): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "add", {rental, creditCard})

  }

}
