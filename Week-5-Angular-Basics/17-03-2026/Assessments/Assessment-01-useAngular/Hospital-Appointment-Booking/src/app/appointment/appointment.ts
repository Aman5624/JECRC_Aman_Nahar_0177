import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment {

  patientName = '';
  doctor = '';
  date = '';
  type = 'Online';
  symptoms = '';
  message = '';

  doctors = ['Dr. Sharma', 'Dr. Mehta', 'Dr. Gupta'];

  get fee() {
    return this.type === 'Online' ? 300 : 500;
  }

  bookAppointment() {
    this.message = `Appointment booked for ${this.patientName} with ${this.doctor}`;
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}