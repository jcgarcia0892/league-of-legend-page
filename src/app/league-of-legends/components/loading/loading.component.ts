import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnChanges {
  loadingVar: boolean = true;
  @Input() animationVar:boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.animationVar) {
      setTimeout(() => {
        this.loadingVar = false;
      }, 1000)
    }
  }


}
