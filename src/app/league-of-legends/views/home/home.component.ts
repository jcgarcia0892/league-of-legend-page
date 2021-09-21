import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { titleAnimation } from '../../animations/title-animation';
import { translateAnimation } from '../../animations/translate-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    translateAnimation,
    titleAnimation,
    fadeInAnimation
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  // ANIMATIONS VAR
  imgAnimation: boolean = true;
  fadeInAnimation: boolean = true;
  titleAnimation: boolean = true;
  // END ANIMATION VAR
  // GETTING HTML ELEMENTS
  @ViewChild('homeVideo') homeVideo!: ElementRef;
  @ViewChild('encuentraTuRol') encuentraTuRol!: ElementRef;
  // END GETTIN HTML ELEMENTS
  offsetTitle!: number;
  offsetHeight!: number;
  rolSelectionControl: FormControl;
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
    this.offsetTitle = this.encuentraTuRol.nativeElement.offsetTop;
    this.offsetHeight = this.encuentraTuRol.nativeElement.offsetHeight;
    
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

  @HostListener('window:scroll', ['$event'])
  handleKeyDown(event: any) {
    let scrollTop = event.srcElement.scrollingElement.scrollTop;
    let clientHeight = event.srcElement.scrollingElement.clientHeight;

    if(this.offsetTitle + this.offsetHeight < scrollTop + clientHeight) {
      this.titleAnimation = false;
    } else {
      this.titleAnimation = true;
    }
  };

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
