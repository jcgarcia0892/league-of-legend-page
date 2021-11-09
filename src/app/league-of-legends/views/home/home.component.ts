import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { followingMouseXAnimation } from '../../animations/following-mouse-x-animation';
import { titleAnimation } from '../../animations/title-animation';
import { translateAnimation } from '../../animations/translate-animation';
import { Roles } from '../../interfaces/roles.interface';
import { AnimationsService } from '../../services/animations.service';
import * as data from './../../../../assets/json/roles.json';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    translateAnimation,
    titleAnimation,
    followingMouseXAnimation,
    fadeInAnimation,
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  // ANIMATIONS VAR
  imgAnimation: boolean = false;
  fadeInAnimation: boolean = true;
  findYourRolTitleAnimation: boolean = true;
  legendsLandTitleAnimation: boolean = true;
  followingMouseXAnimation!: string;
  loading: boolean = false;
  // END ANIMATION VAR
  // GETTING HTML ELEMENTS
  @ViewChild('homeVideo') homeVideo!: ElementRef;
  @ViewChild('findYourRol') findYourRol!: ElementRef;
  @ViewChild('legendsLand') legendsLand!: ElementRef;
  // END GETTIN HTML ELEMENTS
  findYourRolOffsetTop!: number;
  scrollPositionY!: number;
  findYourRolOffsetHeight!: number;
  legendsLandOffsetTop!: number;
  legendsLandOffsetHeight!: number;
  rolSelectionControl: FormControl;
  mouseHorizontalPosition: number = 0;
  videoPath!: string;
  videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];
  imgRolPath: string = 'assets/images/champions-role/assassins.png';




  champion: Roles = {
    name: 'Akali',
    nickName: 'La Asesina Furtiva'
  }
  rolesArray: Roles[] = (data as any).default;
  constructor(
    private animationService: AnimationsService,
    private router: Router,
  ) {
    this.rolSelectionControl = new FormControl('assassins');

  }

  ngOnInit(): void {
    this.videoPath = `assets/videos/${this.videoPaths[this.randomNumber()]}.mp4`;
    this.rolSelectionFunction();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playToVideo();
      this.findYourRolOffsetTop = this.findYourRol.nativeElement.offsetTop;
      this.findYourRolOffsetHeight = this.findYourRol.nativeElement.offsetHeight;
      this.legendsLandOffsetTop = this.legendsLand.nativeElement.offsetTop;
      this.legendsLandOffsetHeight = this.legendsLand.nativeElement.offsetHeight;
    },10);
    
  }
  
  goTo(route: string) {
    this.router.navigate([`/main/${route}`]);
  }
  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths.length);
  };
  playToVideo(): void {
    this.homeVideo.nativeElement.muted = true;
    this.homeVideo.nativeElement.play()
      .then()
      .catch()
      .finally(() => this.loading = true);
  }
  // HOSTLISTENER
  @HostListener('window:scroll', ['$event'])
  scrollDetection(event: any): void {
    let scrollTop = event.srcElement.scrollingElement.scrollTop;
    let clientHeight = event.srcElement.scrollingElement.clientHeight;
    this.scrollPositionY = scrollTop + clientHeight;
    // HEIGHT DE LOS ELEMENTOS
    let findYourRolPositionY = this.findYourRolOffsetTop + this.findYourRolOffsetHeight;
    let legendsLandPositionY = this.legendsLandOffsetTop + this.legendsLandOffsetHeight;
    // END HEIGHT DE LOS ELEMENTOS
    this.findYourRolTitleAnimation = this.animationService.positionYFadeIn(findYourRolPositionY, this.scrollPositionY);
    this.legendsLandTitleAnimation = this.animationService.positionYFadeIn(legendsLandPositionY, this.scrollPositionY);

  };

  @HostListener('document:mousemove', ['$event'])
  mouseMoveDetection(event: any): void {
    let partialZone = event.view.innerWidth / 10;
    this.followingMouseXAnimation = this.animationService.mouseMoveAnimation(event.clientX, partialZone);
  }

  // END HOSTLISTENER

  rolSelectionFunction(): void {
    this.rolSelectionControl.valueChanges.subscribe((rol: string) => {
      this.imgAnimation = true;
      this.fadeInAnimation = !this.fadeInAnimation;
      setTimeout(() => {
        this.imgRolPath = `assets/images/champions-role/${rol}.png`;
      }, 300);

    });
  }

  loadImg(): any {
    let index = this.rolesArray.findIndex(element => element.rol === this.rolSelectionControl.value);
    this.champion.name = this.rolesArray[index].name;
    this.champion.nickName = this.rolesArray[index].nickName;
    this.imgAnimation = false;
  }
}
