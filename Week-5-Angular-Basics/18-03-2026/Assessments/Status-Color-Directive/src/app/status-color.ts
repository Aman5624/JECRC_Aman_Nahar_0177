import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnInit {

  @Input() appStatusColor!: number; // marks

  constructor(private el: ElementRef) {}

  ngOnInit() {

    if (this.appStatusColor >= 50) {
      this.el.nativeElement.style.color = 'green';
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.style.fontWeight = 'bold';
    }

  }
}