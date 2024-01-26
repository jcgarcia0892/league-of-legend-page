import { Component, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-champion-rol',
  standalone: true,
  imports: [
  ],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ChampionRolComponent, multi: true},
  ],
  templateUrl: './champion-rol.component.html',
  styleUrl: './champion-rol.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'app-champion-rol',
  }
})
export class ChampionRolComponent implements ControlValueAccessor {
  value = '';

  championRol = {
  assassin: 'assassin',
  support: 'support',
  fighter: 'fighter',
  mage: 'mage',
  tank: 'tank',
  marksman: 'marksman',
}
  
  onChange(value: string): void {};
  
  onTouched(): void {};

  writeValue(obj: string): void {
    this.value = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleRadioInput(event: Event) {
    const element = event.target as HTMLInputElement;
    this.onChange(element.value);
    this.value = element.value;
  }
}
