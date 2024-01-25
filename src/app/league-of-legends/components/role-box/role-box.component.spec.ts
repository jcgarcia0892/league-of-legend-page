import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBoxComponent } from './role-box.component';

describe('RoleBoxComponent', () => {
  let component: RoleBoxComponent;
  let fixture: ComponentFixture<RoleBoxComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(RoleBoxComponent);
    fixture.componentRef.setInput('role', {roleName: 'asesinos', name: 'asesinos', nickName: 'asesinos'});
    fixture.componentRef.setInput('value', 'asesinos');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
