import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  
  isOpenMenu = signal<boolean>(false);

  screenWidth = signal<number>(0);

  router = inject(Router);

  constructor() {
    this.screenWidth.set(document.body.clientWidth);
  }

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'resize').subscribe((event: Event) => {
      this.screenWidth.set((event.target as Window).document.body.clientWidth);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goTo(path: string): void {
    this.router.navigate([`/main/${path}`]);
    this.isOpenMenu.set(false);
  }

}
