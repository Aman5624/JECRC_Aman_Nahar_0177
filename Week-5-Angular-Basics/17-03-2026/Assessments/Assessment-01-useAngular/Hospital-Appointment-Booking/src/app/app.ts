import { Component, signal } from '@angular/core';
import { Appointment } from './appointment/appointment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Appointment],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hospital Appointment Booking');
}