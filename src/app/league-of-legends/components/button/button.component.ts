import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() text!: string
  @Input() type!: 'btn--primary' | 'btn--secondary';
  @Input() icon!: string | undefined;
  @Input() size!: 'btn--big' | 'btn--normal' | 'btn--small';

  styles: string[] = []
  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
  
  ngOnChanges(): void {
    if(this.type !== undefined) {
      this.styles.push(this.type);
    };
    if(this.size !== undefined) {
      this.styles.push(this.size);
    }
    
  }


}
