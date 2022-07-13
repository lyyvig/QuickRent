import { ObjectResponseModel } from './../models/objectResponseModel';
import { Customer } from './../models/customer';
import { ResponseModel } from './../models/responseModel';
import { ListResponseModel } from './../models/listResponseModel';
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

  getCustomers(): Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.serviceUrl + "getall");
  }

  get(id: number): Observable<ObjectResponseModel<Customer>>{
    return this.httpClient.get<ObjectResponseModel<Customer>>(this.serviceUrl + "get?id=" + id);
  }

  update(customer: Customer): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "update", customer);
  }

}
