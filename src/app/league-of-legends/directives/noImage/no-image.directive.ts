import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoImage]'
})
export class NoImageDirective {

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('error')
  showErrorImage() {
    console.log(this.elementRef.nativeElement)
    this.elementRef.nativeElement.src = 'assets/images/no-image.jpg'
  }

}
