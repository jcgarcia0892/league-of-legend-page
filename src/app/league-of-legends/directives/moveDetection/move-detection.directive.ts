import { Component, HostBinding, HostListener } from '@angular/core';
import { followingMouseXAnimation } from '../../animations/following-mouse-x-animation';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: '[appMoveDetection]',
  animations: [followingMouseXAnimation],
  template: '<ng-content></ng-content>'
})
export class MoveDetectionDirective {

  constructor(
    private animationService: AnimationsService,
  ) {}
  @HostBinding('@followingMouseXAnimation') followingMouseXAnimation!: string;

  @HostListener('document:mousemove', ['$event'])
  makeAnimation(event: any) {
    let partialZone = event.view.innerWidth / 10;
    this.followingMouseXAnimation = this.animationService.mouseMoveAnimation(event.clientX, partialZone);
  }

}
