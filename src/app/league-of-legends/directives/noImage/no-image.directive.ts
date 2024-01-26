import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appNoImage]',
  standalone: true,
})
export class NoImageDirective {

  defaultImagePath = 'assets/images/no-image.jpg';

  constructor(
    private elementRef: ElementRef
  ) {}

  @HostListener('error')
  showErrorImage() {
    this.elementRef.nativeElement.src = this.defaultImagePath;
  }

}
