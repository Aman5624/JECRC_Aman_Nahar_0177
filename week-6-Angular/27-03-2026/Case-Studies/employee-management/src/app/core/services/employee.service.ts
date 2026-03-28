import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  employees = [
    { id: 1, name: 'John Doe', role: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', role: 'Project Manager' },
  ];

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(emp:any){
    this.employees.push(emp);
  }

  updateEmployee(id:number, emp:any){
    const index = this.employees.findIndex(e => e.id === id);
    if(index !== -1){
      this.employees[index] = emp;
    }
  }

  deleteEmployee(id:number){
    this.employees = this.employees.filter(e => e.id !== id);
  }

  searchEmployees(term:string){
    return this.employees.filter(e =>
      e.name.toLowerCase().includes(term.toLowerCase()) || 
      e.role.toLowerCase().includes(term.toLowerCase()));
  }
}
