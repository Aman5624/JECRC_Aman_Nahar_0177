import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Transaction {
  date: string;
  description: string;
  type: number;
  amount: number;
  balance: string;
}

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './record-table.html',
  styleUrls: ['./record-table.css']
})
export class RecordTableComponent implements OnInit {
  private readonly apiBase = 'http://localhost:5147/api/transactions';

  allTransactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];
  selectedDate: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  // ── Keep this method as required by the task spec ──
  getTransactions(): Transaction[] {
    return this.allTransactions;
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.http.get<Transaction[]>(this.apiBase).subscribe({
      next: (data) => {
        this.allTransactions = data;
        this.displayedTransactions = [...data];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Could not connect to the API. Make sure the .NET backend is running on port 5000.';
        this.isLoading = false;
      }
    });
  }

  filterByDate(): void {
    if (!this.selectedDate) return;
    this.isLoading = true;
    this.http.get<Transaction[]>(`${this.apiBase}/filter?date=${this.selectedDate}`).subscribe({
      next: (data) => {
        this.displayedTransactions = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Filter request failed.';
        this.isLoading = false;
      }
    });
  }

  sortByAmount(): void {
    this.isLoading = true;
    this.http.get<Transaction[]>(`${this.apiBase}/sorted`).subscribe({
      next: (data) => {
        this.displayedTransactions = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Sort request failed.';
        this.isLoading = false;
      }
    });
  }

  getTypeLabel(type: number): string {
    return type === 0 ? 'Credit' : 'Debit';
  }
}
