import { Observable } from 'rxjs';
import { ColorResponseModel } from './../models/colorResponseModel';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './serviceConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private serviceUrl = apiUrl + "colors/"

  constructor(private httpClient :HttpClient) { }

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.serviceUrl + "getall");
  }

}
