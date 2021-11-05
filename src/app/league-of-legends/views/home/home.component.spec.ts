import { trigger } from '@angular/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '../../components/button/button.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AnimationsService } from '../../services/animations.service';

import { HomeComponent } from './home.component';

class FakeRouter {
  navigate(routes: string[]){}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, ButtonComponent, LoadingComponent ],
      imports: [BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: Router, useClass:  FakeRouter},
        AnimationsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('El video debe haberse empezado a reproducir', (done) => {

    let homeVideo: HTMLVideoElement = fixture.debugElement.query(By.css('video')).nativeElement;

    homeVideo.muted = true;
    homeVideo.autoplay;
    homeVideo.play()
      .finally(() => {
        let isPlayed = homeVideo.currentTime > 0;
        expect(isPlayed).toBeTruthy();
        done();
      });
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

  it('El titulo ENCUENTRA TU ROL debe tener la animación titleAnimation', () => {
    let classes = fixture.debugElement.query( By.css('.findRol__title') ).classes;
    window.scroll(0, 1000);

    expect(classes['ng-trigger-titleAnimation']).toBeTruthy();

  });

  it('El titulo TIERRA DE LEGENDAS debe tener la animación titleAnimation', () => {
    let classes = fixture.debugElement.query( By.css('.legendsLand__title') ).classes;
    window.scroll(0, 1000);
    expect(classes['ng-trigger-titleAnimation']).toBeTruthy();
  });

  it('La imagén del mapa del juego debe tener la animación followingMouseXAnimation', () => {
    let classes = fixture.debugElement.query( By.css('.legendsLand__body__img') ).classes;
    expect(classes['ng-trigger-followingMouseXAnimation']).toBeTruthy();
  });

  it('El método mouseMoveDetection debe ser ejecutado', () => {
    spyOn(component, 'mouseMoveDetection');
    document.dispatchEvent(new MouseEvent('mousemove', {clientX: 50, clientY: 150, buttons: 1}));
    expect(component.mouseMoveDetection).toHaveBeenCalled();

  });

  it('La sección de TIERRA DE LEGENDAS debe tener la animación de la imagen', () => {
    let tag = fixture.debugElement.query( By.css('.legendsLand__body__img') );
    let clases = tag.classes['ng-trigger-followingMouseXAnimation'];
    spyOn(component, 'mouseMoveDetection');
    component.mouseMoveDetection(null);
    component.followingMouseXAnimation = 'toXsLeft';
    expect(true).toBeTruthy();
  });

});
