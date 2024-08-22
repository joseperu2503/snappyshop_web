import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCircle]',
})
export class CircleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }
}
