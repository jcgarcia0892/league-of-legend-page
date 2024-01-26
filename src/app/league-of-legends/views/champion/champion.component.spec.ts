
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { from, Observable, of,  } from 'rxjs';

import { ChampionComponent } from './champion.component';
import { provideHttpClient } from '@angular/common/http';
import { ChampionResp, Data } from '../../interfaces/champion-resp.interface';
import { ChampionsDataService } from '../../services/champions-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const version = '14.2.1';

const data: Data = {
  Aatrox: {
    allytips: ['Utilizad Deslizamiento sombrío'],
    enemytips: ['Los ataques de Aatrox son muy predecibles'],
    blurb: 'Aatrox y sus hermanos',
    id: 'Aatrox',
    info: {attack: 8, defense: 4, magic: 3, difficulty: 4},
    key: "266",
    lore: "Aatrox y sus hermanos, otrora respetados",
    name: "Aatrox",
    partype: "Pozo sangriento",
    image: {
      full: "Aatrox.png",
      group: "champion",
      h: 48,
      sprite: "champion0.png",
      w: 48,
      x: 0,
      y: 0,
    },
    passive: {
      description: 'De forma periódica, el siguiente',
      name: 'Aspecto de la muerte',
      image: {
        full: "Aatrox.png",
        group: "champion",
        h: 48,
        sprite: "champion0.png",
        w: 48,
        x: 0,
        y: 0,
      },
    },
    tags: ['Fighter', 'Tank'],
    title: 'la Espada de los Oscuros',
    recommended: [],
    skins: [{
      chromas: false,
      id: "266000",
      name: "default",
      num: 0,
    }],
    spells: [
      {
        cooldown: [14, 12, 10, 8, 6],
        cooldownBurn: "14/12/10/8/6",
        cost: [0, 0, 0, 0, 0],
        costBurn: "0",
        costType: "Sin coste",
        datavalues: {},
        description: "Aatrox golpea con su espadón",
        effect: [null, [0,0,0,0,0,]],
        effectBurn: [null, '0','0','0'],
        id: 'AatroxQ',
        image: {
          full: "Aatrox.png",
          group: "champion",
          h: 48,
          sprite: "champion0.png",
          w: 48,
          x: 0,
          y: 0,
        },
        leveltip: {
          effect: [],
          label: [],
        },
        maxammo: "-1",
        maxrank: 5,
        name: 'La espada de los oscuros',
        range: [25000, 2500],
        rangeBurn: '25000',
        resource: 'Sin coste',
        tooltip: 'Aatrox golpea',
        vars: [],
      }
    ],
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
    },
  }
}
class FakeActivatedRoute {
  params: Observable<any> = from([{id: 'Aatrox'}]);
}

class ChampionsDataServiceMock {
  getChampion(): Observable<ChampionResp> {
    return of({ data: data, version: version, type: '', format: '' });
  }
}

describe('ChampionComponent', () => {
  let component: ChampionComponent;
  let fixture: ComponentFixture<ChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: ChampionsDataService, useClass: ChampionsDataServiceMock },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
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

  it('should change the rol', () => {
    let rol = 'Assassin';
    let resp = component.translateRol(rol);
    expect(resp).toBe('Asesino');

    rol = 'Fighter';
    resp = component.translateRol(rol);
    expect(resp).toBe('Luchador');

    rol = 'Mage';
    resp = component.translateRol(rol);
    expect(resp).toBe('Mago');

    rol = 'Marksman';
    resp = component.translateRol(rol);
    expect(resp).toBe('Tirador');

    rol = 'Support';
    resp = component.translateRol(rol);
    expect(resp).toBe('Soporte');

    rol = 'Tank';
    resp = component.translateRol(rol);
    expect(resp).toBe('Tanque');
  });

  it('should create an object with the name "Aspecto de la muerte"', () => {
    component.mapSkills(data[component.idChamp()].passive, version, 1);
    component.mapSkills(data[component.idChamp()].passive, version, 2);
    let resp = component.mapSkills(data[component.idChamp()].passive, version, 3);
    expect(resp.name).toBe('Aspecto de la muerte');
  });
});
