import { TestBed } from '@angular/core/testing';

import { AnimationsService } from './animations.service';

describe('AnimationsService', () => {
  let service: AnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if elementPosition is greater than scrollPosition', () => {
    let elementPosition = 100;
    let scrollPosition = 50;
    expect(service.positionYFadeIn(elementPosition, scrollPosition)).toBeTrue();

    elementPosition = 50;
    scrollPosition = 100;
    expect(service.positionYFadeIn(elementPosition, scrollPosition)).toBeFalse();
  });

  it('should move according to the position in X axis and the value of the Partial Zone', () => {
    let positionX = 100;
    let partialZone = 110;
    let resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toXsLeft');
    
    partialZone = 50;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toSmLeft');
    
    partialZone = 40;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toMdLeft');
    
    partialZone = 25;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toLgLeft');
    
    partialZone = 20;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toXlLeft');
    
    partialZone = 18;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toXsRight');

    partialZone = 15;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toSmRight');

    partialZone = 14;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toMdRight');

    partialZone = 12;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toLgRight');

    partialZone = 10;
    resp = service.mouseMoveAnimation(positionX, partialZone);
    expect(resp).toBe('toXlRight');

  });
});
