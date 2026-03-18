import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHighlightDirective } from './price-highlight';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,PriceHighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  products = [
    { name: 'Laptop', price: 70000 },
    { name: 'Phone', price: 30000 },
    { name: 'TV', price: 55000 },
    { name: 'Headphones', price: 2000 }
  ];
}