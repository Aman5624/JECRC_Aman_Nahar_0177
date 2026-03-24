import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts() : Product[] {
    return [
      new Product(1,'Laptop',999.99),
      new Product(2,'smratphone',499.99),
      new Product(3,'Headphone',199.99)
    ];
  }

  getProductByID(id: number): Product | undefined {
    return this.getProducts().find(p => p.productID === id);
  }
}
