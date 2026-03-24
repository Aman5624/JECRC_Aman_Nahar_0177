import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductComponent } from './product/product';
import { Contact } from './contact/contact';
import { Error } from './error/error';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'product', component: ProductComponent },
  { path: 'contact', component: Contact },
  {path : '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: Error }
];
