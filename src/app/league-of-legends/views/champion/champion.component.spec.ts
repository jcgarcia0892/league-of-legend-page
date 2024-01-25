import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable, of, Subject } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { LoadingComponent } from '../../components/loading/loading.component';

import { ChampionComponent } from './champion.component';
import { provideHttpClient } from '@angular/common/http';

class FakeActivatedRoute {
  params: Observable<any> = from([{id: 'Draven'}]);
}

describe('ChampionComponent', () => {
  let component: ChampionComponent;
  let fixture: ComponentFixture<ChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
      ],
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
});
