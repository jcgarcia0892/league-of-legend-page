import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { followingMouseXAnimation } from '../../animations/following-mouse-x-animation';
import { titleAnimation } from '../../animations/title-animation';
import { translateAnimation } from '../../animations/translate-animation';

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

  constructor() {
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

    if(this.findYourRolOffsetTitle + this.findYourRolOffsetHeight < scrollTop + clientHeight) {
      this.findYourRolTitleAnimation = false;
    } else {
      this.findYourRolTitleAnimation = true;
    }

    if(this.legendsLandOffsetTitle + this.legendsLandOffsetHeight < scrollTop + clientHeight) {
      this.legendsLandTitleAnimation = false;
    } else {
      this.legendsLandTitleAnimation = true;
    }
  };

  @HostListener('document:mousemove', ['$event'])
  mouseMoveDetection(event: any): void {
    let partialZone = event.view.innerWidth / 10;

    if(event.clientX <= partialZone * 1) {
      this.followingMouseXAnimation = 'toXsLeft';
    } else if(event.clientX <= partialZone * 2) {
      this.followingMouseXAnimation = 'toSmLeft';
    } else if(event.clientX <= partialZone * 3) {
      this.followingMouseXAnimation = 'toMdLeft';
    } else if(event.clientX <= partialZone * 4) {
      this.followingMouseXAnimation = 'toLgLeft';
    } else if(event.clientX <= partialZone * 5) {
      this.followingMouseXAnimation = 'toXlLeft';
    } else if(event.clientX <= partialZone * 6) {
      this.followingMouseXAnimation = 'toXsRight';
    } else if(event.clientX <= partialZone * 7) {
      this.followingMouseXAnimation = 'toSmRight';
    } else if(event.clientX <= partialZone * 8) {
      this.followingMouseXAnimation = 'toMdRight';
    } else if(event.clientX <= partialZone * 9) {
      this.followingMouseXAnimation = 'toLgRight';
    } else {
      this.followingMouseXAnimation = 'toXlRight';
    }

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
