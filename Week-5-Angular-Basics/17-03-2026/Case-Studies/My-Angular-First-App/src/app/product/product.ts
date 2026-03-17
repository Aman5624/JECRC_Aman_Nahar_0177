import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  products = [
    { name: "Laptop", price: 500000 },
    { name: "Phone", price: 20000 },
    { name: "Tablet", price: 15000 }
  ];
}
