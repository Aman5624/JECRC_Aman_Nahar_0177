import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  styleUrl: './task-list.css',
  template: `
    <section class="task-list-card">
      <h2>Task List</h2>

      <ul class="task-list">
        <li class="task-item" *ngFor="let task of tasks">
          <span class="task-title" [class.completed]="task.completed">
            {{ task.title }}
          </span>

          <div class="task-actions">
            <button class="btn btn-toggle" (click)="toggle(task)">
              {{ task.completed ? 'Undo' : 'Complete' }}
            </button>

            <button class="btn btn-delete" (click)="delete(task.id!)">Delete</button>
          </div>
        </li>
      </ul>
    </section>
  `
})
export class TaskList implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res.slice(0, 10);
    });
  }

  addTaskToList(task: Task) {
    this.tasks = [task, ...this.tasks].slice(0, 10);
  }

  delete(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggle(task: Task) {
    this.taskService.updateTaskStatus(task.id!, !task.completed)
      .subscribe(() => {
        task.completed = !task.completed;
      });
  }
}