import { Component, signal } from '@angular/core';
import { Role } from './role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Role],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userRole = 'user';
}
