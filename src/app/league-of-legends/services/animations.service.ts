import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() {}

  positionYFadeIn(elementPositionY: number, scrollPositionY: number): boolean {
    return (elementPositionY < scrollPositionY) ? false : true;
  }

  mouseMoveAnimation(positionX: number, partialZone: number): string {
    if(positionX <= partialZone * 1) {
      return 'toXsLeft';
    } else if(positionX <= partialZone * 2) {
      return 'toSmLeft';
    } else if(positionX <= partialZone * 3) {
      return 'toMdLeft';
    } else if(positionX <= partialZone * 4) {
      return 'toLgLeft';
    } else if(positionX <= partialZone * 5) {
      return 'toXlLeft';
    } else if(positionX <= partialZone * 6) {
      return 'toXsRight';
    } else if(positionX <= partialZone * 7) {
      return 'toSmRight';
    } else if(positionX <= partialZone * 8) {
      return 'toMdRight';
    } else if(positionX <= partialZone * 9) {
      return 'toLgRight';
    } else {
      return 'toXlRight';
    }
  }
}
