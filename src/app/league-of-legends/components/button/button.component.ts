import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnChanges {
  @Input() text!: string

  @Input() type!: 'btn--primary' | 'btn--secondary';

  @Input() icon!: string | undefined;

  @Input() size!: 'btn--big' | 'btn--normal' | 'btn--small';

  @Input() border!: 'btn-no--border';

  styles: string[] = []
  
  ngOnChanges(): void {
    if(this.type !== undefined) {
      this.styles.push(this.type);
    };
    if(this.size !== undefined) {
      this.styles.push(this.size);
    }
    if(this.border !== undefined) {
      this.styles.push(this.border);
    }
    
  }
}
