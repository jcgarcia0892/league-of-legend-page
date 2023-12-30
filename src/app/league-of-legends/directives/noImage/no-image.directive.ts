import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoImage]',
  standalone: true,
})
export class NoImageDirective {

  constructor(
    private elementRef: ElementRef
  ) {}

  @HostListener('error')
  showErrorImage() {
    this.elementRef.nativeElement.src = 'assets/images/no-image.jpg'
  }

}
