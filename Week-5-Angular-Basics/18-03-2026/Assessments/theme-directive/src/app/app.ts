import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ThemeDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  theme: 'dark' | 'light' = 'light';

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

}