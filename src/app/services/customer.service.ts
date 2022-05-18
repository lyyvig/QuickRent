import { CustomerResponseModel } from './../models/customerResponseModel';
import { Observable } from 'rxjs';
import { apiUrl } from './serviceConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private serviceUrl = apiUrl + "customers/"

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.serviceUrl + "getall");
  }

}
