import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  styleUrl: './task-form.css',
  template: `
    <section class="task-form-card">
      <h2>Task Actions</h2>

      <div class="row">
        <input class="task-input" [(ngModel)]="title" placeholder="Enter task">
        <button class="btn btn-primary" (click)="addTask()">Add</button>
      </div>

      <div class="row">
        <input class="task-input" [(ngModel)]="searchTerm" placeholder="Search task">
        <button class="btn btn-secondary" (click)="search()">Search</button>
      </div>
    </section>
  `
})
export class TaskForm {

  title: string = '';
  searchTerm: string = '';

  @Output() refresh = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title) return;

    const task: Task = {
      title: this.title,
      completed: false
    };

    this.taskService.addTask(task).subscribe((createdTask) => {
      const taskToEmit: Task = {
        ...task,
        id: createdTask.id ?? Date.now()
      };

      this.title = '';
      this.refresh.emit(taskToEmit);
    });
  }

  search() {
    this.taskService.searchTasks(this.searchTerm).subscribe(res => {
      console.log('Search Result:', res);
    });
  }
}