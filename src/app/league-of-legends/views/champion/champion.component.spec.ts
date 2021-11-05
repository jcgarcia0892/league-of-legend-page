import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable, of, Subject } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { LoadingComponent } from '../../components/loading/loading.component';

import { ChampionComponent } from './champion.component';

class FakeActivatedRoute {
  // private subject = new Subject<string>();
  params: Observable<any> = from([{id: 'Draven'}]);

  // push(valor: string) {
  //   this.params.next(valor);
  // }

  // get params(): Observable<string> {
  //   return this.subject.asObservable();
  // }
}

describe('ChampionComponent', () => {
  let component: ChampionComponent;
  let fixture: ComponentFixture<ChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionComponent, LoadingComponent, ButtonComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule, SwiperModule, ReactiveFormsModule ],
      providers: [
        { provide: ActivatedRoute, useClass:  FakeActivatedRoute}
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente champion', () => {
    expect(component).toBeTruthy();
  });

  it('Debe recibir el id de los parametros', () => {

    const activatedRoute: FakeActivatedRoute = TestBed.inject(ActivatedRoute);
    // activatedRoute.push('Draven');
    
    expect(component.idChamp).toBe('Draven');

  });
});
