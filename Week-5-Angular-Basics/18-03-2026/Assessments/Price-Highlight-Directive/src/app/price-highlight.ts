import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]',
  standalone: true
})
export class PriceHighlightDirective implements OnInit {

  @Input() appPriceHighlight!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appPriceHighlight > 50000) {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.color = 'green';
    }
  }
}