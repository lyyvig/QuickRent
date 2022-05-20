import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { apiUrl } from './serviceConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private serviceUrl = apiUrl + "customers/"

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.serviceUrl + "getall");
  }

}
