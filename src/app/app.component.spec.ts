import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RulesComponent } from './league-of-legends/views/rules/rules.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'main/rules', component: RulesComponent },
        ])
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('Debe crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe de tener un router-oulet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement.query( By.directive(RouterOutlet) );
    expect(debugElement).not.toBeNull();
  });

  it('El scroll debe regresar a la posicion 0, 0', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    document.body.style.minHeight = '9000px';
    document.body.style.minWidth = '9000px';
    window.scroll(0, 1000);
    const router = TestBed.inject(Router);
    router.navigate(['main/rules']);
    fixture.whenStable().then(() => {
      expect(window.scrollY).toBe(0);
      done();
    })
  });
});
