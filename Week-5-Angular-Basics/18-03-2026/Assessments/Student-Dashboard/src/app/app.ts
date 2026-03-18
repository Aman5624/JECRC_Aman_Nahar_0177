import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  students = [
    { name: 'Aman', marks: 92 },
    { name: 'Riya', marks: 78 },
    { name: 'Rahul', marks: 45 },
    { name: 'Sneha', marks: 60 },
    { name: 'Karan', marks: 88 }
  ];
}
