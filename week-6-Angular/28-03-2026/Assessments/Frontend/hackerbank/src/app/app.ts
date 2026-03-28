import { Component, signal } from '@angular/core';
import { RecordTableComponent } from './record-table/record-table'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecordTableComponent],
  template: `<app-record-table></app-record-table>`,
})
export class App {
  protected readonly title = signal('hackerbank');
}
