import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lol-page';

  constructor(
    private router: Router,
    private viewPortScroller: ViewportScroller
  ) {
    let path = localStorage.getItem('path');
    if(path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.viewPortScroller.scrollToPosition([0, 0]));
  }
}
