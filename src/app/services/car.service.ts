import { CarDetailResponseModel } from './../models/carDetailResponseModel';
import { apiUrl } from './serviceConstants';
import { CarResponseModel } from './../models/carResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private serviceUrl = apiUrl + "cars/";

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.serviceUrl + "getall")
  }

  getDetails():Observable<CarDetailResponseModel>{
    return this.httpClient.get<CarDetailResponseModel>(this.serviceUrl + "getdetails")
  }

}
