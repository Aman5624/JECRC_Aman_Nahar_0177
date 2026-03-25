import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root', 
})
export class TaskService {
  private api = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  // GET ALL TASKS 
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  // GET TASK BY ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  // CREATE TASK (POST)
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  // UPDATE FULL TASK (PUT)
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${task.id}`, task);
  }

  // PARTIAL UPDATE (PATCH)
  updateTaskStatus(id: number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, { 
      completed: completed 
    });
  }

  // GENERIC PATCH (Reusable)
  updatePartial(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, data);
  }

  // DELETE TASK
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // SEARCH TASK (API FILTER)
  searchTasks(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}?title_like=${term}`);
  }

}
