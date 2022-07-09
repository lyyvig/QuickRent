import { CarImage } from './../models/carImage';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { apiUrl } from './serviceConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  serviceUrl = apiUrl + 'carimages/';

  constructor(
    private httpClient: HttpClient
  ) { }



  uploadImages(images: File[], carId: number): Observable<ResponseModel> {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('carId', carId.toString());

    return this.httpClient.post<ResponseModel>(this.serviceUrl + "addmultiple", formData);
  }

  getImagesByCarId(id: number): Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.serviceUrl + "getbycarid?carId=" + id);
  }

  deleteImage(id: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "delete", { id: id });
  }

}
