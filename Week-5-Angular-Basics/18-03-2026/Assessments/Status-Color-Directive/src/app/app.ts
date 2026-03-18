import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  students = [
    { name: 'Aman', marks: 92 },
    { name: 'Riya', marks: 40 },
    { name: 'Rahul', marks: 55 },
    { name: 'Sneha', marks: 30 }
  ];

}