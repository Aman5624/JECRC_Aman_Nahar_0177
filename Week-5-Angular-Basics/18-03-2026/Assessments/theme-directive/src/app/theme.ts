import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme: 'dark' | 'light' = 'light';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appTheme === 'dark') {
      this.el.nativeElement.style.backgroundColor = '#1e293b';
      this.el.nativeElement.style.color = '#f8fafc';
    } else {
      this.el.nativeElement.style.backgroundColor = '#f8fafc';
      this.el.nativeElement.style.color = '#0f172a';
    }
  }
}