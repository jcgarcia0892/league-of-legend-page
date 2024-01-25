import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionFilterComponent } from './champion-filter.component';

describe('ChampionFilterComponent', () => {
  let component: ChampionFilterComponent;
  let fixture: ComponentFixture<ChampionFilterComponent>;

  beforeEach(async () => {
    
    fixture = TestBed.createComponent(ChampionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
