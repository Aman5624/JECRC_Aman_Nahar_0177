import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.html',
  imports: [CommonModule,FormsModule, ReactiveFormsModule]
})
export class CheckoutComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      address: [''],
      email: [''],
      phone: [''],
      zip: [''],
      gender: [''],
      delivery: ['Standard'],
      terms: [false],
      subscribe: [false],
      city: [''],
      state: [''],
      country: [''],
      date: [''],
      notes: [''],
      payment: ['COD'],

      addresses: this.fb.array([]),
      payments: this.fb.array([])
    });
  }

  get addresses() {
    return this.form.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.fb.control(''));
  }

  submit() {
    console.log(this.form.value);
  }
}