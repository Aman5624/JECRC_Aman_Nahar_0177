import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: any, qty: number) {
    const existing = this.cartItems.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity += qty;
    } else {
      this.cartItems.push({ product, quantity: qty });
    }

    this.cartSubject.next(this.cartItems);
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.product.id !== id);
    this.cartSubject.next(this.cartItems);
  }

  updateQty(id: number, qty: number) {
    const item = this.cartItems.find(i => i.product.id === id);
    if (item) item.quantity = qty;
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}