import { trigger } from '@angular/animations';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '../../components/button/button.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TitleAppearsDirective } from '../../directives/titleAppears/title-appears.directive';
import { AnimationsService } from '../../services/animations.service';

import { HomeComponent } from './home.component';

class FakeRouter {
  navigate(routes: string[]) {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, ButtonComponent, LoadingComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule],
      providers: [{ provide: Router, useClass: FakeRouter }, AnimationsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
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

  it('El titulo ENCUENTRA TU ROL debe tener la directiva de apptitleappears', () => {
    let directive = fixture.debugElement.query(By.css('.findRol__title'));
    let attributeName = directive.nativeNode.attributes['0'].name;
    expect(attributeName).toContain('apptitleappears');
  });

  it('El titulo TIERRA DE LEGENDAS debe tener la directiva de apptitleappears', () => {
    let directive = fixture.debugElement.query(By.css('.legendsLand__title'));
    let attributeName = directive.nativeNode.attributes['0'].name;
    expect(attributeName).toContain('apptitleappears');
  });

  it('La imagén del mapa del juego debe tener la animación followingMouseXAnimation', () => {
    let directive = fixture.debugElement.query(
      By.css('.legendsLand__body__img')
    );
    let attributeName = directive.nativeNode.attributes['0'].name;
    expect(attributeName).toContain('appmovedetection');
  });

  it('Cada vez que se escoge un rol debe ocurrir una animación en la imagen', () => {
    component.rolSelectionControl.setValue('supports');
    expect(component.imgAnimation).toBeTruthy();
  });

  it('Cada vez que se escoge un rol debe cambiar el valor de fadeInAnimation', () => {
    const fadeInAnimation = component.fadeInAnimation;
    component.rolSelectionControl.setValue('supports');
    expect(component.fadeInAnimation === !fadeInAnimation).toBeTruthy();
  });
});
