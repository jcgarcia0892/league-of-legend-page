import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { translateAnimation } from '../../animations/translate-animation';
import { Roles } from '../../interfaces/roles.interface';
import * as data from './../../../../assets/json/roles.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    translateAnimation,
    fadeInAnimation,
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  // ANIMATIONS VAR
  imgAnimation: boolean = false;
  fadeInAnimation: boolean = true;
  // followingMouseXAnimation!: string;
  loading: boolean = false;
  // END ANIMATION VAR
  // GETTING HTML ELEMENTS
  @ViewChild('homeVideo') homeVideo!: ElementRef;
  // END GETTIN HTML ELEMENTS
  rolSelectionControl: FormControl;
  videoPath!: string;
  videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];
  imgRolPath: string = 'assets/images/champions-role/assassins.png';
  champion: Roles = {
    name: 'Akali',
    nickName: 'La Asesina Furtiva'
  }
  rolesArray: Roles[] = (data as any).default;
  
  constructor(
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
    },10);
    
  }
  
  goTo(route: string) {
    this.router.navigate([`/main/${route}`]);
  }

  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths.length);
  };

  playToVideo(): void {
    const isPlaying = this.homeVideo.nativeElement.currentTime > 0 && !this.homeVideo.nativeElement.paused && !this.homeVideo.nativeElement.ended && this.homeVideo.nativeElement.readyState > this.homeVideo.nativeElement.HAVE_CURRENT_DATA
    if(!isPlaying) {
      this.homeVideo.nativeElement.muted = true;
      this.homeVideo.nativeElement.play()
      .then()
      .catch()
      .finally(() => this.loading = true);
    }
    setTimeout(() => {
      // console.log(this.homeVideo.nativeElement.currentTime);

    }, 300);
  }

  rolSelectionFunction(): void {
    this.rolSelectionControl.valueChanges.subscribe((rol: string) => {
      this.imgAnimation = true;
      this.fadeInAnimation = false;
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
    this.fadeInAnimation = true;
  }
}
