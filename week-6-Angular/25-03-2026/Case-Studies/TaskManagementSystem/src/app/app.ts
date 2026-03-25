import { Component, ViewChild } from '@angular/core';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';
import { Task } from './task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList, TaskForm],
  template: `
    <h1>Task Management System</h1>

    <app-task-form (refresh)="onTaskAdded($event)"></app-task-form>

    <app-task-list #taskList></app-task-list>
  `
})
export class App {

  @ViewChild('taskList') taskList!: TaskList;

  onTaskAdded(task: Task) {
    this.taskList.addTaskToList(task);
  }
}