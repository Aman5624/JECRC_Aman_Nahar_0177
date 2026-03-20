import { Component } from '@angular/core';
import { ProductComponent } from './components/product/product';
import { CartComponent } from './components/cart/cart';
import { CheckoutComponent } from './components/checkout/checkout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    CartComponent,
    CheckoutComponent
  ],
  template: `
    <h1>Smart E-Commerce</h1>

    <app-product></app-product>
    <app-cart></app-cart>
    <app-checkout></app-checkout>
  `
})
export class App {}