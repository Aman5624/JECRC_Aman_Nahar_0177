import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [CommonModule],
  template: `
    <h2>Employee List</h2>
    <ul>
      <li *ngFor="let emp of employees">
        {{ emp.name }} - {{ emp.role }}
      </li>
    </ul>
  `
})
export class EmployeeList {
  employees: any[] = [];
  
  constructor(public service: EmployeeService) {
    this.employees = this.service.getEmployees();
  }
}
