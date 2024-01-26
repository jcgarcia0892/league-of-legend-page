import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsComponent } from './champions.component';
import { provideHttpClient } from '@angular/common/http';
import { ChampionsDataService } from '../../services/champions-data.service';
import { Observable, of } from 'rxjs';

const championDataMock = {
    data: {
      Aatrox: {
        blurb: 'Aatrox y sus hermanos,',
        id: 'Aatrox',
        key: '266',
        name: 'Aatrox',
        partype: 'Pozo sangriento',
        tags: ['Fighter', 'Tank'],
        title: 'la Espada de los Oscuros',
        version: '14.2.1',
        info: {attack: 8, defense: 4, magic: 3, difficulty: 4},
        image: {
          full: "Aatrox.png",
          group: "champion",
          h: 48,
          sprite: "champion0.png",
          w: 48,
          x: 0,
          y: 0,
        },
        stats: {
          armor: 38,
          armorperlevel: 4.45,
          attackdamage: 60,
          attackdamageperlevel: 5,
          attackrange: 175,
          attackspeed: 0.651,
          attackspeedperlevel: 2.5,
          crit: 0,
          critperlevel: 0,
          hp: 650,
          hpperlevel: 114,
          hpregen: 3,
          hpregenperlevel: 1,
          movespeed: 345,
          mp: 0,
          mpperlevel: 0,
          mpregen: 0,
          mpregenperlevel: 0,
          spellblock: 32,
          spellblockperlevel: 2.05,
        }
      },
    },

}

class FakeRouter {
  navigate(path: string[]){}
}

class ChampionsDataServiceMock {
  getChampions(): Observable<any> {
    return of(championDataMock);
  }
}

describe('ChampionsComponent', () => {
  let component: ChampionsComponent;
  let fixture: ComponentFixture<ChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: ChampionsDataService, useClass: ChampionsDataServiceMock }
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
    expect(component.championsCards().length).toBe(1);
  });

  it('should call component.championFilterComponent.cleanChipFilter when cleanChipFilter is triggered', () => {
    const cleanChipFilterMock = spyOn(component.championFilterComponent, 'cleanChipFilter');
    component.cleanChipFilter('rol');
    expect(cleanChipFilterMock).toHaveBeenCalled();
  });

  it('should call component.championFilterComponent.cleanFilters when cleanFilters is triggered', () => {
    const cleanFiltersMock = spyOn(component.championFilterComponent, 'cleanFilters');
    component.cleanFilters();
    expect(cleanFiltersMock).toHaveBeenCalled();
  });
});
