import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de ocultarse el componente cuando cargue la pantalla', (done) => {
    component.animationVar = true;
    component.ngOnChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const section = fixture.debugElement.query( By.css('section') );
      fixture.whenStable().then(() => {
        expect(section).toBeNull();    
        done();
      });
    }, 1000)

  })
});
