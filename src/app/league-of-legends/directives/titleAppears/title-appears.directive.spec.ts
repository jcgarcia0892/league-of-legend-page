import { ElementRef } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { TitleAppearsDirective } from './title-appears.directive';

class MockElementRef extends ElementRef{
  constructor(){
    super(null);
  }
}

describe('TitleAppearsDirective', () => {
  it('should create an instance', () => {
    const directive = new TitleAppearsDirective(new AnimationsService(), new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
