import { AsyncPipe,CommonModule,DatePipe,KeyValuePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CustomCurrencyPipe } from './custom-currency-pipe';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe,DatePipe,KeyValuePipe,CustomCurrencyPipe,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  today = new Date();

  data$ = of([{
    id:1,
    ProductName:'Laptop',
    Price: 1000,
    Status: 'Delivered'
  },
  {
    id:2,
    ProductName:'Mobile',
    Price: 20000,
    Status: 'Pending'
  }
  ]);
  product = {
    name: 'Laptop',
    price: 50000
  };
}
