import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsComponent } from './champions.component';
import { provideHttpClient } from '@angular/common/http';

class FakeRouter {
  navigate(path: string[]){}
}

describe('ChampionsComponent', () => {
  let component: ChampionsComponent;
  let fixture: ComponentFixture<ChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
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
});
