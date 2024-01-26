import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ChampionFilterComponent } from './champion-filter.component';

describe('ChampionFilterComponent', () => {
  let component: ChampionFilterComponent;
  let fixture: ComponentFixture<ChampionFilterComponent>;

  beforeEach(async () => {
    
    fixture = TestBed.createComponent(ChampionFilterComponent);
    fixture.componentRef.setInput('championsData', [
      {
        difficulty: 4,
        id: "Aatrox", 
        img: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg",
        name: "Aatrox",
        roles: ['Fighter', 'Tank'],
      },
      {
        difficulty: 5,
        id: "Ahri",
        img: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ahri_0.jpg",
        name: "Ahri",
        roles: ['Mage', 'Assassin'],
      }
    ])
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set idChamp when championsSearcherControl changes its value', () => {
    component.championsSearcherControl.setValue('Aatrox');
    expect(component.idChamp()).toBe('Aatrox');
  });

  it('should set filters when championsRolesControl changes its value', () => {
    component.championsRolesControl.setValue('asesinos');
    expect(component.filters()[0].value).toBe('asesinos');

    component.championsRolesControl.setValue('tanques');
    expect(component.filters()[0].value).toBe('tanques');

  });

  it('should set filters when filterChampionByDifficulty is triggered', () => {
    let difficulty = 1;
    component.filterChampionByDifficulty(difficulty);
    expect(component.filters()[0].value).toBe(difficulty);
    difficulty = 2;
    component.filterChampionByDifficulty(difficulty);
    expect(component.filters()[0].value).toBe(difficulty);
  });

  it('should change championsCardsFilter when filterChampionByName is triggered', () => {
    component.filterChampionByName('Aatrox');
    expect(component.championsCardsFilter()[0].name).toBe('Aatrox');
    component.filterChampionByName('Ahri');
    expect(component.championsCardsFilter()[0].name).toBe('Ahri');
  });
  
  it('activeFocusSearcherInput should change to false after 90 millisec', fakeAsync(() => {
    component.activeFocusSearcherInput.set(true);
    component.blurSearcher();
    flush();
    expect(component.activeFocusSearcherInput()).toBeFalse();
  }));

  it('levelsControl should change to false after 90 millisec', fakeAsync(() => {
    component.levelsControl.setValue(true);
    component.blurDifficulty();
    flush();
    expect(component.levelsControl.value).toBeFalse();
  }));

  it('should clean chip filters Nombre', () => {
    let field = 'nombre';
    component.championsSearcherControl.setValue('Aatrox');
    component.cleanChipFilter(field);
    expect(component.championsSearcherControl.value).toBe('');
  });

  it('should clean chip filters Rol', () => {
    let field = 'rol';
    component.championsRolesControl.setValue('asesinos');
    component.cleanChipFilter(field);
    expect(component.championsRolesControl.value).toBe('');
  });

  it('should clean chip filters difficulty', () => {
    let field = 'dificultad';
    let difficulty = 1;
    component.filterChampionByDifficulty(difficulty);
    component.cleanChipFilter(field);
    expect(component.difficultChamp()).toBe(0);
  });

  it('should reset all the values of the filters', () => {
    component.championsSearcherControl.setValue('Aatrox');
    component.championsRolesControl.setValue('luchadores');
    component.filterChampionByDifficulty(4);
    component.cleanFilters();
    expect(component.difficultChamp()).toBe(0);
    expect(component.championsSearcherControl.value).toBe('');
    expect(component.championsRolesControl.value).toBe('');
  })
});
