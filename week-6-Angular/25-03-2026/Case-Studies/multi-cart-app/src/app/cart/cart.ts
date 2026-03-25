import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  constructor(private cartService: CartService) {}

  getCartItems() {
    return this.cartService.getCartItems();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product.name);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
