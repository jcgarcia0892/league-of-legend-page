import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit{
  eventObs!: Subscription;
  isOpenMenu: boolean = false;
  screenWidth: number;
  constructor(
    private router: Router
  ) {
    this.screenWidth = document.body.clientWidth;
  }

  ngOnInit(): void {
    this.eventObs = fromEvent(window, 'resize').subscribe((data: any) => {
      this.screenWidth = data.target.screen.width
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.eventObs.unsubscribe();
  }

  goTo(path: string): void {
    this.router.navigate([`/main/${path}`]);
    this.isOpenMenu = false;
  }

}
