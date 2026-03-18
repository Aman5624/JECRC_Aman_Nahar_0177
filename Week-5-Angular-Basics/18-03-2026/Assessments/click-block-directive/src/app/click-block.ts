import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {

  @Input() appClickBlock: boolean = true; // condition

  constructor(private el: ElementRef) {}

  // Listen to click event
  @HostListener('click', ['$event'])
  onClick(event: Event) {

    if (!this.appClickBlock) {
      event.preventDefault();   // stop default action
      event.stopPropagation();  // stop event bubbling

      alert('❌ Click is blocked!');

    }
  }

}