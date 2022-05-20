import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
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

}
