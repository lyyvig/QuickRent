import { BrandsResponseModel } from './../models/brandsResponseModel';
import { apiUrl } from './serviceConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private serviceUrl = apiUrl + "brands/"

  constructor(private httpClient :HttpClient) { }

  getBrands(): Observable<BrandsResponseModel> {
    return this.httpClient.get<BrandsResponseModel>(this.serviceUrl + "getall");
  }

}
