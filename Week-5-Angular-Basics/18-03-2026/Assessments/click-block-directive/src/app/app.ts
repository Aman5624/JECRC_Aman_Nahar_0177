import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from './click-block';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  allowClick = false; // try true/false

  handleClick() {
    alert('✅ Button Clicked!');
  }
}