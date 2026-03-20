import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  imports: [CommonModule,FormsModule]
})
export class ProductComponent {

  searchText = '';
  selectedCategory = '';

  products: any[] = [
  { id:1, name:'Laptop', price:50000, category:'Electronics', rating:4, image:'', qty:1 },
  { id:2, name:'Phone', price:20000, category:'Electronics', rating:5, image:'', qty:1 },
  { id:3, name:'Shoes', price:2000, category:'Fashion', rating:3, image:'', qty:1 }
];

  constructor(private cartService: CartService) {}

  // ✅ ADD THIS METHOD
  filteredProducts() {
    return this.products.filter(p =>
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  add(product: any, qty: number) {
    this.cartService.addToCart(product, Number(qty));
  }

}