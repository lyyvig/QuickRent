import { FilterOptions } from './../models/filterOptions';
import { ObjectResponseModel } from './../models/objectResponseModel';
import { CarDetail } from './../models/carDetail';
import { ListResponseModel } from './../models/listResponseModel';
import { apiUrl } from './serviceConstants';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private serviceUrl = apiUrl + "cars/";

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.serviceUrl + "getall")
  }

  getDetails():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.serviceUrl + "getdetails")
  }

  getDetailsByFilter(filterOptions:FilterOptions):Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.post<ListResponseModel<CarDetail>>(this.serviceUrl + "getdetailsbyfilter", filterOptions)
  }

  getCarDetail(carId:number):Observable<ObjectResponseModel<CarDetail>>{
    return this.httpClient.get<ObjectResponseModel<CarDetail>>(this.serviceUrl + "getcardetail?carId=" + carId)
  }

}
