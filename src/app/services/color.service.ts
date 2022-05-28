import { ResponseModel } from './../models/responseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private serviceUrl = apiUrl + "colors/"

  constructor(private httpClient :HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.serviceUrl + "getall");
  }

  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "add", color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "update", color);
  }

  deleteColor(color:Color) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "delete", color);
  }

}
