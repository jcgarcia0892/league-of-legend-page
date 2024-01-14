import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionSearchComponent } from './champion-search.component';

describe('ChampionSearchComponent', () => {
  let component: ChampionSearchComponent;
  let fixture: ComponentFixture<ChampionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
