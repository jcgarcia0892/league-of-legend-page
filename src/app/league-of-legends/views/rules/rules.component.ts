import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RulesInfo } from '../../interfaces/rulesInfo.interface';
import { PowerInfo } from '../../interfaces/powersInfo.interface';
import * as rules from './../../../../assets/json/rulesInfo.json';
import * as powers from './../../../../assets/json/powersInfo.json';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit, AfterViewInit {
  @ViewChild('rulesVideo') rulesVideo!: ElementRef;
  @ViewChild('getExp') getExp!: ElementRef;
  @ViewChild('getGold') getGold!: ElementRef;
  @ViewChild('rules') rules!: ElementRef;
  loading: boolean = false;
  videoPath!: string;
  videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];
  scollInY: number = 0;
  videoPowerPath: string = 'assets/images/get-gold.webm';
  videoPowerPostion = 0;
  rulesInfo: RulesInfo[] = (rules as any).default;
  powersInfo: PowerInfo[] = (powers as any).default;

  constructor() {
  }

  ngOnInit(): void {
    this.videoPath = `assets/videos/${this.videoPaths[this.randomNumber()]}.mp4`;

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playToVideo();
      this.scollInY = this.rules.nativeElement.getBoundingClientRect().top;
    }, 10);

  }

  playToVideo(): void {
    this.rulesVideo.nativeElement.muted = true;
    this.getExp.nativeElement.muted = true;
    this.getGold.nativeElement.muted = true;
    this.rulesVideo.nativeElement.play().finally(() => this.loading = true);
    this.getExp.nativeElement.play().finally();
    this.getGold.nativeElement.play().finally();
  }
  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths.length);
  };

  scrollToRules(): void {
    window.scrollTo({
      top: this.scollInY,
      behavior: 'smooth'
    });
  };

  changeItemList(subtitle: string, action: string, currentPageNumber: number): void {
    let index = this.rulesInfo.findIndex((rule) => rule.header.subtitle === subtitle);
    if(action === 'prev') {
      if(currentPageNumber <= 1) {
        currentPageNumber = 1;
      } else {
        currentPageNumber--;
      }
    } else {
      if(currentPageNumber >= this.rulesInfo[index].card.list.length) {
        currentPageNumber = this.rulesInfo[index].card.list.length;
      } else {
        currentPageNumber++
      }
    };
    this.rulesInfo[index].card.currentPageNumber = currentPageNumber;
    this.addTranslatePage(index, currentPageNumber);
  };

  showSelectedPower(title: string, videoPosition: number): void {
    this.videoPowerPostion = videoPosition;
    let index = this.powersInfo.findIndex((power: any) => power.title === title);
    this.hidePowers();
    this.powersInfo[index].isShown = true;
    this.videoPowerPath = this.powersInfo[index].videoPath;
  }

  hidePowers(): void {
    this.powersInfo.forEach((power: any) => {
      power.isShown = false;
    });
  };

  translateX(): number {
    return this.videoPowerPostion * 100 * -1;
  }

  translatePage(pageNumber: number): number {
    return (pageNumber - 1) * 100 * -1;
  }
  addTranslatePage(index: number, currentPageNumber: number): void {
    this.rulesInfo[index].card.translate = this.translatePage(currentPageNumber);
  };

}
