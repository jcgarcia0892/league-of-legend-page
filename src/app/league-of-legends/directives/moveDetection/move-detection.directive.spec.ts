import { AnimationsService } from '../../services/animations.service';
import { MoveDetectionDirective } from './move-detection.directive';

describe('MoveDetectionDirective', () => {
  it('should create an instance', () => {
    const directive = new MoveDetectionDirective(new AnimationsService());
    expect(directive).toBeTruthy();
  });
});
