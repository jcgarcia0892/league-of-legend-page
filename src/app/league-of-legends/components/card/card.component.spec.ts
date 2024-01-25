import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CardComponent } from './card.component';

class FakeRouter {
  navigate(params: any[]): void {}
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: Router, useClass: FakeRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    const championCard = {   
      name: 'Draven',
      img: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Draven_0.jpg',
      id: 'Draven',
      difficulty: 3,
      roles: ['Marksmen']
    };
    component.championCard = championCard;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de contener la ruta /main/champion/Draven', () => {
    const router: Router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.goTo(component.championCard.id);
    expect(spy).toHaveBeenCalledWith(['/main/champion', 'Draven'])
  });
});
