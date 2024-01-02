import { NgClass, NgIf } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonBorder, ButtonClasses, ButtonSize, ButtonType } from '../../interfaces/button-interface';

@Component({
  selector: 'button[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [NgIf, NgClass],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'app-button btn-base',
    '[class]': 'buttonClasses'
  }
})
export class ButtonComponent {
  @Input() set type(type: ButtonType) {
    this.buttonClasses.push(type);
  };

  @Input() set size(size: ButtonSize) {
    this.buttonClasses.push(size);
  };

  @Input() set border(border: ButtonBorder) {
    this.buttonClasses.push(border);
  };

  buttonClasses: ButtonClasses = [];
}
