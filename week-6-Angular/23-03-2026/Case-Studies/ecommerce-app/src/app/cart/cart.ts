import { Component } from '@angular/core';
import { CartService } from '../cartService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cartService: CartService) {}

  get total() {
    return this.cartService.getTotal();
  }
}
