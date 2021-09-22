import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { followingMouseXAnimation } from '../../animations/following-mouse-x-animation';
import { titleAnimation } from '../../animations/title-animation';
import { translateAnimation } from '../../animations/translate-animation';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    translateAnimation,
    titleAnimation,
    fadeInAnimation,
    followingMouseXAnimation
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  // ANIMATIONS VAR
  imgAnimation: boolean = true;
  fadeInAnimation: boolean = true;
  findYourRolTitleAnimation: boolean = true;
  legendsLandTitleAnimation: boolean = true;
  followingMouseXAnimation!: string;
  // END ANIMATION VAR
  // GETTING HTML ELEMENTS
  @ViewChild('homeVideo') homeVideo!: ElementRef;
  @ViewChild('findYourRol') findYourRol!: ElementRef;
  @ViewChild('legendsLand') legendsLand!: ElementRef;
  // END GETTIN HTML ELEMENTS
  findYourRolOffsetTitle!: number;
  findYourRolOffsetHeight!: number;
  legendsLandOffsetTitle!: number;
  legendsLandOffsetHeight!: number;
  rolSelectionControl: FormControl;
  mouseHorizontalPosition: number = 0;
  videoPath!: string;
  videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];
  imgRolPath: string = 'assets/images/champions-role/assassins.png';


  rolsArray = [
    {
      rol: 'assassins',
      name: 'Akali',
      nickName: 'La Asesina Furtiva'
    },
    {
      rol: 'fighters',
      name: 'Yasuo',
      nickName: 'El Imperdonable'
    },
    {
      rol: 'mages',
      name: 'Lux',
      nickName: 'La Dama Luminosa'
    },
    {
      rol: 'marksmen',
      name: 'Jink',
      nickName: 'La Bala Perdida'
    },
    {
      rol: 'supports',
      name: 'Thresh',
      nickName: 'El Carcelero Implacable'
    },
    {
      rol: 'tanks',
      name: 'Leona',
      nickName: 'El Radiante Amanecer'
    },
  ];

  champion: any = {
    name: 'Akali',
    nickName: 'La Asesina Furtiva'
  }

  constructor(
    private animationService: AnimationsService
  ) {
    this.rolSelectionControl = new FormControl('assassins');

  }

  ngOnInit(): void {
    this.videoPath = `assets/videos/${this.videoPaths[this.randomNumber()]}.mp4`;
    this.rolSelectionFunction();
  }

  ngAfterViewInit(): void {
    this.playToVideo();
    this.findYourRolOffsetTitle = this.findYourRol.nativeElement.offsetTop;
    this.findYourRolOffsetHeight = this.findYourRol.nativeElement.offsetHeight;
    this.legendsLandOffsetTitle = this.legendsLand.nativeElement.offsetTop;
    this.legendsLandOffsetHeight = this.legendsLand.nativeElement.offsetHeight;
    
  }
  
  goTo() {
    console.log('prueba');
  }
  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths.length);
  };
  playToVideo(): void {
    this.homeVideo.nativeElement.muted = true;
    this.homeVideo.nativeElement.play();
  }
  // HOSTLISTENER
  @HostListener('window:scroll', ['$event'])
  scrollDetection(event: any) {
    let scrollTop = event.srcElement.scrollingElement.scrollTop;
    let clientHeight = event.srcElement.scrollingElement.clientHeight;
    let scrollPositionY = scrollTop + clientHeight;
    // HEIGHT DE LOS ELEMENTOS
    let findYourRolPositionY = this.findYourRolOffsetTitle + this.findYourRolOffsetHeight;
    let legendsLandPositionY = this.legendsLandOffsetTitle + this.legendsLandOffsetHeight;
    // END HEIGHT DE LOS ELEMENTOS
    this.findYourRolTitleAnimation = this.animationService.positionYFadeIn(findYourRolPositionY, scrollPositionY);
    this.legendsLandTitleAnimation = this.animationService.positionYFadeIn(legendsLandPositionY, scrollPositionY);

  };

  @HostListener('document:mousemove', ['$event'])
  mouseMoveDetection(event: any): void {
    let partialZone = event.view.innerWidth / 10;
    this.followingMouseXAnimation = this.animationService.mouseMoveAnimation(event.clientX, partialZone);
  }

  // END HOSTLISTENER

  rolSelectionFunction(): void {
    this.rolSelectionControl.valueChanges.subscribe((rol: string) => {
      this.imgAnimation = !this.imgAnimation;
      this.fadeInAnimation = !this.fadeInAnimation;
      let index = this.rolsArray.findIndex(element => element.rol === rol);
      setTimeout(() => {
        this.champion.name = this.rolsArray[index].name;
        this.champion.nickName = this.rolsArray[index].nickName;
        this.imgRolPath = `assets/images/champions-role/${rol}.png`;
      }, 300);

    });
  }
}
