import { order } from './../models/order';
import { Rental } from './../models/rental';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  set(rental:Rental){
    order.rental = rental;
  }

  getRental(){
    return order.rental;
  }
}
