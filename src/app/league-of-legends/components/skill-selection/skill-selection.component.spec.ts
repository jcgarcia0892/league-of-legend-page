import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSelectionComponent } from './skill-selection.component';

describe('SkillSelectionComponent', () => {
  let component: SkillSelectionComponent;
  let fixture: ComponentFixture<SkillSelectionComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SkillSelectionComponent);
    fixture.componentRef.setInput('skill', {
      checked: true,
      description: "De forma periódica, el siguiente ataque básico",
      img: "https://ddragon.leagueoflegends.com/cdn/14.2.1/img/passive/Aatrox_Passive.png",
      key: "Pasiva",
      name: "Aspecto de la muerte",
    });
    fixture.componentRef.setInput('name', 'Aspecto de la muerte');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue should change the value of the value property', () => {
    const text = 'text';
    component.writeValue(text);
    component.registerOnChange((value: string): void => {});
    component.registerOnTouched(() => {});
    expect(component.value).toBe(text);
  });

  it('changeValue should change the value of the value property', () => {
    const text = 'text';
    component.changeValue(text);
    expect(component.value).toBe(text);
  });
});
