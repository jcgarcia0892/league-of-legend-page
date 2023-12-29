import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBoxComponent } from './role-box.component';

describe('RoleBoxComponent', () => {
  let component: RoleBoxComponent;
  let fixture: ComponentFixture<RoleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
