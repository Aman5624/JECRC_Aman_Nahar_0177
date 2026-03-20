import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderChild } from '../order-child/order-child';
import { stat } from 'fs';

@Component({
  selector: 'app-order-parent',
  standalone: true,
  imports: [CommonModule, OrderChild],
  templateUrl: './order-parent.html',
  styleUrl: './order-parent.css',
})
export class OrderParent {

  order = {
    id: 101,
    item: 'Laptop',
    status: 'pending',
    price: 50000
  };

  updateOrder() {
    this.order = {
      ...this.order,
      status: this.order.status === 'pending' ? 'Delivered' : 'pending',
    };
  }
  destroyChild = true;
  
  toggleChild() {
    this.destroyChild = !this.destroyChild;
  }
}
