import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener dos links a la página de home', () => {
    const links = fixture.debugElement.queryAll( By.css('a') );
    let linksToHome = 0;
    for(let link of links) {
      if( link['attributes'].routerLink === '/main/home' ) {
        linksToHome += 1;
      }
    }
    if(component.screenWidth() > 700) {
      expect(linksToHome).toBe(2);
    } else {
      expect(linksToHome).toBe(1);
    }

  });

  it('Debe tener un link a la página de champions', () => {
    const links = fixture.debugElement.queryAll( By.css('a') );
    let existe = false;
    for(let link of links) {
      if( link['attributes'].routerLink === '/main/champions' ) {
        existe = true;
        break;
      }
    }
    if(component.screenWidth() > 700) {
      expect(existe).toBeTruthy();
    } else {
      expect(existe).toBeFalsy();
    }
  });

  it('Debe tener un link a la página de rules', () => {
    const links = fixture.debugElement.queryAll( By.css('a') );
    let existe = false;
    for(let link of links) {
      if( link['attributes'].routerLink === '/main/rules' ) {
        existe = true;
        break;
      }
    }
    if(component.screenWidth() > 700) {
      expect(existe).toBeTruthy();
    } else {
      expect(existe).toBeFalsy();
    }
  });

  it('Debe redireccionar a home', () => {

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const path = 'home';
    component.goTo(path);
    expect(spy).toHaveBeenCalledWith([`/main/${path}`]);
  });

  it('Debe redireccionar a champions', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const path = 'champions';
    component.goTo(path);
    expect(spy).toHaveBeenCalledWith([`/main/${path}`]);
  });

  it('Debe redireccionar a rules', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const path = 'rules';
    component.goTo(path);
    expect(spy).toHaveBeenCalledWith([`/main/${path}`]);
  });

  it('El fromEvent debe haber sido llamado', () => {
    window.dispatchEvent(new Event('resize'));
    const esIgual = component.screenWidth() === window.document.body.clientWidth;
    expect(esIgual).toBeTruthy();
  });
});
