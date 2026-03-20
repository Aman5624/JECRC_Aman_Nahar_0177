import { 
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
 } from '@angular/core';
 import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-child.html',
  styleUrl: './order-child.css',
})
export class OrderChild implements 
 OnChanges,
 OnInit,
 DoCheck,
 AfterContentInit,
 AfterContentChecked,
 AfterViewInit,
 AfterViewChecked,
 OnDestroy
{
  @Input() orderData: any;

  logs: string[] = [];

  log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()}: ${message}`);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.log('ngOnChanges  - Input Data Changed');
  }
  
  ngOnInit() {
    this.log('ngOnInit - Component Initialized');
  }

  ngDoCheck() {
    this.log('ngDoCheck - Change Detection');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit - Content Initialized');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked - Content Checked');
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit - View Initialized');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked - View Checked');
  }
  
  ngOnDestroy() {
    this.log('ngOnDestroy - Component Destroyed');
  }
}
