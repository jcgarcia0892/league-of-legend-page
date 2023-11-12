import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnChanges {
  loadingVar = true;

  @Input() animationVar:boolean = false;

  ngOnChanges(): void {
    if(this.animationVar) {
      setTimeout(() => {
        this.loadingVar = false;
      }, 1000)
    }
  }
}
