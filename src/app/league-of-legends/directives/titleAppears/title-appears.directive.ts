import { AfterViewInit, Component, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { titleAnimation } from '../../animations/title-animation';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: '[appTitleAppears]',
  template: '<ng-content></ng-content>',
  animations: [titleAnimation]
})
export class TitleAppearsDirective implements AfterViewInit {
  scrollPositionY!: number;
  titleOffsetTop!: number;
  titleOffsetHeight!: number;
  constructor(
    private animationService: AnimationsService,
    private elementRef: ElementRef
  ) { }
  @HostBinding('@titleAnimation') titleAnimation!: string;

  @HostListener('window:scroll', ['$event'])
  scrollDetection(event: any): void {
    let scrollTop = event.srcElement.scrollingElement.scrollTop;
    let clientHeight = event.srcElement.scrollingElement.clientHeight;
    this.scrollPositionY = scrollTop + clientHeight;
    // HEIGHT DE LOS ELEMENTOS
    let titlePositionY = this.titleOffsetTop + this.titleOffsetHeight;
    // END HEIGHT DE LOS ELEMENTOS
    let isTrueAnimation = this.animationService.positionYFadeIn(titlePositionY, this.scrollPositionY);
    this.titleAnimation = (isTrueAnimation) ? 'appear' : 'disappear';
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.titleOffsetTop = this.elementRef.nativeElement.offsetTop;
      this.titleOffsetHeight = this.elementRef.nativeElement.offsetHeight;
    },10);
  };

}
