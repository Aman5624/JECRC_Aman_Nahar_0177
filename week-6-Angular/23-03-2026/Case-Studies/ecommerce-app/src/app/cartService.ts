import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  addToCart(product: Product) {
    const items = this.cartItems.find( i => i.productID === product.id);
    if(items) {
      items.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(index : number) {
    this.cartItems.splice(index, 1);
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}