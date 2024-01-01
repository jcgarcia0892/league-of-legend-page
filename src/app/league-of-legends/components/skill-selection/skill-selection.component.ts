import { NgClass } from '@angular/common';
import { Component, Input, ViewEncapsulation, computed } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule, ControlValueAccessor } from '@angular/forms';
import { Skill } from '../../interfaces/champion.interface';

@Component({
  selector: 'app-skill-selection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './skill-selection.component.html',
  styleUrl: './skill-selection.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SkillSelectionComponent,
      multi: true,
    },
  ],
  host: {
    'class': 'app-skill-selection',
  }
})
export class SkillSelectionComponent implements ControlValueAccessor {
  @Input({required: true}) skill!: Skill;

  @Input({required: true}) name!: string;

  altSkillImage = computed(() => `${this.skill.name} image`);

  value = '';

  onChange!: (value: string) => void;

  onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeValue(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
