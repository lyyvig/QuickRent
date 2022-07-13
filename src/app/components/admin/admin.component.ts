import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cars',
        routerLink: ['cars']
      },
      {
        label: 'Brands',
        routerLink: ['brands']
      },
      {
        label: 'Colors',
        routerLink: ['colors']
      },
      {
        label: 'Users',
        routerLink: ['users']
      },
      {
        label: 'Rentals',
        routerLink: ['rentals']
      }
    ];
  }

}
