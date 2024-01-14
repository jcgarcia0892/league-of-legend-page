import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionRolComponent } from './champion-rol.component';

describe('ChampionRolComponent', () => {
  let component: ChampionRolComponent;
  let fixture: ComponentFixture<ChampionRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampionRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
