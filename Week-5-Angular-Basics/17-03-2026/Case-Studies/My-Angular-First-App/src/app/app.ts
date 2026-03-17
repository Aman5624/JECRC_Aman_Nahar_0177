import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Home } from './home/home';
import { Product } from './product/product';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  imports: [Home,Product,User],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My-Angular-First-App');
}
