import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.transition') transition: string = 'background-color 0.3s ease-in-out';

  constructor() {}

  // @HostListener escuta eventos no elemento
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = '#e0e0e0';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent';
  }
}
