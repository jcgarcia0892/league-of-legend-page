import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSelectionComponent } from './skill-selection.component';

describe('SkillSelectionComponent', () => {
  let component: SkillSelectionComponent;
  let fixture: ComponentFixture<SkillSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
