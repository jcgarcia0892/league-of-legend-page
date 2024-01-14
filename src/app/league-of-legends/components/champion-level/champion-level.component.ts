import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-champion-level',
  standalone: true,
  imports: [
    NgIf, NgFor, NgClass
  ],
  templateUrl: './champion-level.component.html',
  styleUrl: './champion-level.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ChampionLevelComponent, multi: true },
  ],
  host: {
    'class': 'app-champion-level',
  },
})
export class ChampionLevelComponent implements ControlValueAccessor {

  @Input() difficultChamp = 0;

  @Input() difficulty: number[] = [];

  @Output() blurDifficultyEmitter = new EventEmitter<void>();

  @Output() filterChampionByDifficultyEmitter = new EventEmitter<number>();

  value!: boolean;

  onChange(value: boolean): void {};
  
  onTouched(): void {};

  writeValue(value: boolean): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInputCheckbox(): void {
    this.value = !this.value;
    this.onChange(this.value);
  }

  closeOverlay(): void {
    if(this.value) {
      this.value = false;
      this.onChange(this.value);
    }
  }

}
