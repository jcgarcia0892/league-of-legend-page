import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionLevelComponent } from './champion-level.component';

describe('ChampionLevelComponent', () => {
  let component: ChampionLevelComponent;
  let fixture: ComponentFixture<ChampionLevelComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChampionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
