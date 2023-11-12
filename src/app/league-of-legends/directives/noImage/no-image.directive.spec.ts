import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from '../../components/card/card.component';
import { NoImageDirective } from './no-image.directive';

class MockElementRef extends ElementRef {
  constructor() {
    super(null)
  }
}

describe('NoImageDirective', () => {
  let fixture: ComponentFixture<CardComponent>;
  let des: DebugElement;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      declarations: [ CardComponent, NoImageDirective ],
      imports: [RouterTestingModule],
    })
    .createComponent(CardComponent);

    fixture.detectChanges();

    des = fixture.debugElement.query(By.directive(NoImageDirective));
  });

  xit('should create an instance', () => {
    const directive = new NoImageDirective(new MockElementRef());
    console.log(directive);
    expect(directive).toBeTruthy();
  });
});
