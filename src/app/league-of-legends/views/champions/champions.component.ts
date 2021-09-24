import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { titleAnimation } from '../../animations/title-animation';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
  animations: [
    titleAnimation
  ]
})
export class ChampionsComponent implements OnInit, AfterViewInit {
  findYourChampTitleAnimation: boolean = true;

  championsName: string[] = [
    'AATROX',
    'AHRI',
    'AKALI',
    'ALISTAR',
    'ANNIE',
    'AATROX',
    'AHRI',
    'AKALI',
    'ALISTAR',
    'ANNIE',
    'AATROX',
    'AHRI',
    'AKALI',
    'ALISTAR',
    'ANNIE',
    'AATROX',
    'AHRI',
    'AKALI',
    'ALISTAR',
    'ANNIE',
  ];

  championsNameFiltered: string[] = [];

  activeFocusSearcherInput: boolean = false;
  activeFocusLevelInput: boolean = false;

  championsSearcherControl: FormControl;
  levelsControl: FormControl;
  // GETTING HTML ELEMENTS
  @ViewChild('findYourChamp') findYourChamp!: ElementRef;
  // END GETTING HTML ELEMENTS
  findYourChampOffsetTop!: number;
  findYourChampOffsetHeight!: number;
  constructor(
    private animationService: AnimationsService
  ) {
    this.championsSearcherControl = new FormControl('');
    this.levelsControl = new FormControl(false);
  }

  ngOnInit(): void {
    this.championNameFilterFunction('');
    this.championsSearcherControl.valueChanges.subscribe((text: string) => {
      this.championNameFilterFunction(text);
      console.log(text.length);
      if(text.length === 0) {
        this.activeFocusSearcherInput = false;
      }
    })
  }

  @HostListener('window:scroll', ['$event'])
  scrollDetection(event: any): void {
    let scrollTop = event.srcElement.scrollingElement.scrollTop;
    let clientHeight = event.srcElement.scrollingElement.clientHeight;
    let scrollPositionY = scrollTop + clientHeight;

    let findYourRolPositionY = this.findYourChampOffsetTop + this.findYourChampOffsetHeight;
    this.findYourChampTitleAnimation = this.animationService.positionYFadeIn(findYourRolPositionY, scrollPositionY);

  }

  ngAfterViewInit(): void {
    // this.findYourChampOffsetTop = this.findYourChamp.nativeElement.offsetTop;
    // this.findYourChampOffsetHeight = this.findYourChamp.nativeElement.offsetHeight;
  }

  deleteText(): void {
    this.championsSearcherControl.setValue('');
    
  }
  championNameFilterFunction(text: string): void {
    this.championsNameFiltered = [];
    text = text.toUpperCase();
    console.log(text);
    for (let name of this.championsName) {
      console.log(name);
      if(name.indexOf(text) !== -1) {
        console.log(name);
        this.championsNameFiltered.push(name);
      }
    }
  }


  prueba(): void {
    // let booleano = false;
    // if(booleano !== this.levelsControl.value) {
    //   this.levelsControl.setValue(booleano);
    // }
    console.log(true);

  }

}
