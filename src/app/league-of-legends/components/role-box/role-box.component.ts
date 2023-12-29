import { Component, Input, ViewEncapsulation, computed, forwardRef, } from '@angular/core';
import { Role, } from '../../interfaces/roles.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './role-box.component.html',
  styleUrl: './role-box.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoleBoxComponent),
      multi: true,
    }
  ],
  host : {
    'class': 'app-role-box'
  },
})
export class RoleBoxComponent implements ControlValueAccessor {
  @Input({required: true}) role!: Role;

  @Input({required: true}) value!: string;

  imgPath = computed(() => `url('./assets/images/champions-role/${this.role.roleName}-icon.svg')`);

  onChange!: (value : string) => void;

  onTouch!: () => void;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  inputChange(roleName: string): void {
    this.value = roleName;
    this.onChange(roleName);
    this.onTouch();
  }
}
