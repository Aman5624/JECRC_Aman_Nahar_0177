import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Cart } from './cart/cart';
import { CartService } from './cart.service';
import { Products } from './products/products';

@Component({
  selector: 'app-root',
  imports: [Products, Cart],
  providers: [CartService],
  template: `
    <main>
      <h1>{{ title() }}</h1>
      <app-products></app-products>
      <app-cart></app-cart>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css'
})
export class App {
  private readonly cartService = inject(CartService);

  protected readonly title = signal('Multi Cart App');

  addToCart(productName: string): void {
    this.cartService.addToCart(productName);
  }

  getCartItems(): string[] {
    return this.cartService.getCartItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
