import { RentalDetailResponseModel } from './../models/rentalDetailResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private serviceUrl = apiUrl + "rentals/"

  constructor(private httpClient: HttpClient) { }

  getRentalDetails(): Observable<RentalDetailResponseModel>{
    return this.httpClient.get<RentalDetailResponseModel>(this.serviceUrl + "getdetails")
  }

}
