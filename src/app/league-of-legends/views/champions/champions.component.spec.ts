import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChampionsComponent } from './champions.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

class FakeRouter {
  navigate(path: string[]){}
}

describe('ChampionsComponent', () => {
  let component: ChampionsComponent;
  let fixture: ComponentFixture<ChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionsComponent, LoadingComponent, ButtonComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [
        { provide: Router, useClass: FakeRouter }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente de champions', () => {
    expect(component).toBeTruthy();
  });

  it('Debe redireccionar a un campeon en especifico', () => {

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    const id = 'Draven';
    const path = 'champion';
    component.goTo(id);
    expect(spy).toHaveBeenCalledWith([`/main/${path}`, id]);
  });
});
