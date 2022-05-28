import { ResponseModel } from './../models/responseModel';
import { Brand } from './../models/brand';
import { ListResponseModel } from './../models/listResponseModel';
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

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.serviceUrl + "getall");
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "add", brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "update", brand);
  }

  deleteBrand(brand:Brand) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "delete", brand);
  }

}
