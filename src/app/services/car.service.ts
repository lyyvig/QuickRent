import { ObjectResponseModel } from './../models/objectResponseModel';
import { CarDetail } from './../models/carDetail';
import { ListResponseModel } from './../models/listResponseModel';
import { apiUrl } from './serviceConstants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  getDetailsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.serviceUrl + "getdetailsbybrandid?brandId=" + brandId)
  }

  getDetailsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.serviceUrl + "getdetailsbycolorid?colorId=" + colorId)
  }

  getCarDetail(carId:number):Observable<ObjectResponseModel<CarDetail>>{
    return this.httpClient.get<ObjectResponseModel<CarDetail>>(this.serviceUrl + "getcardetail?carId=" + carId)
  }

}
