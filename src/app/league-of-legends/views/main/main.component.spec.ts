import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let router: Router;
  let location: Location;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, NavbarComponent, FooterComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('Debe de crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de tener router-outlet', () => {
    const debugElement = fixture.debugElement.query( By.directive(RouterOutlet) );
    expect(debugElement).not.toBeNull();
  })
});
