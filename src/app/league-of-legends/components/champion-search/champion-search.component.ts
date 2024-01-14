import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChampionCard } from '../../interfaces/champion-card.interface';

@Component({
  selector: 'app-champion-search',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
  ],
  templateUrl: './champion-search.component.html',
  styleUrl: './champion-search.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ChampionSearchComponent, multi: true }
  ],
  host: {
    'class': 'app-champion-search'
  }
})
export class ChampionSearchComponent implements ControlValueAccessor {

  @Input() activeFocusSearcherInput = false;

  @Input() championsNameFiltered: ChampionCard[] = [];

  @Output() blurEventEmitter = new EventEmitter<void>();

  @Output() focusEventEmitter = new EventEmitter<void>();

  @Output() championIdEventEmitter = new EventEmitter<string>();

  @Output() cleanTextEventEmitter = new EventEmitter<'nombre'>();

  value = signal<string>('');

  onChange!: (value: string) => void;

  onTouched!: () => void;

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.value.set(element.value);
    this.onChange(element.value)
  }
}
