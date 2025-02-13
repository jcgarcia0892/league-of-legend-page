import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { RulesInfo } from '../../interfaces/rulesInfo.interface';
import { PowerInfo } from '../../interfaces/powersInfo.interface';
import * as rules from './../../../../assets/json/rulesInfo.json';
import * as powers from './../../../../assets/json/powersInfo.json';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TitleAppearsDirective } from '../../directives/titleAppears/title-appears.directive';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss'],
    imports: [
        NgClass,
        NgIf,
        NgFor,
        NgStyle,
        LoadingComponent,
        ButtonComponent,
        TitleAppearsDirective,
    ]
})
export class RulesComponent implements OnInit, AfterViewInit {
  @ViewChild('rulesVideo') rulesVideo!: ElementRef;

  @ViewChild('getExp') getExp!: ElementRef;

  @ViewChild('getGold') getGold!: ElementRef;

  @ViewChild('rules') rules!: ElementRef;

  loading = signal<boolean>(false);

  videoPath = signal<string>('');

  videoPaths = signal<string[]>(['caitlyn', 'kaisa', 'sylas-entrace', 'sylas']);

  scollInY = signal<number>(0);

  videoPowerPath = signal<string>('assets/images/get-gold.webm');

  videoPowerPostion = signal<number>(0);

  rulesInfo = signal<RulesInfo[]>((rules as any).default);

  powersInfo = signal<PowerInfo[]>((powers as any).default);

  ngOnInit(): void {
    this.videoPath.set(`assets/videos/${this.videoPaths()[this.randomNumber()]}.mp4`);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playToVideo();
      this.scollInY.set(this.rules.nativeElement.offsetTop);
    }, 10);
  }

  playToVideo(): void {
    this.rulesVideo.nativeElement.muted = true;
    this.getExp.nativeElement.muted = true;
    this.getGold.nativeElement.muted = true;
    this.rulesVideo.nativeElement.play().finally(() => this.loading.set(true));
    this.getExp.nativeElement.play().finally();
    this.getGold.nativeElement.play().finally();
  }
  
  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths().length);
  };

  scrollToRules(): void {
    window.scrollTo({
      top: this.scollInY(),
      behavior: 'smooth'
    });
  };

  changeItemList(subtitle: string, action: string, currentPageNumber: number): void {
    let index = this.rulesInfo().findIndex((rule) => rule.header.subtitle === subtitle);
    if(action === 'prev') {
      if(currentPageNumber <= 1) {
        currentPageNumber = 1;
      } else {
        currentPageNumber--;
      }
    } else {
      if(currentPageNumber >= this.rulesInfo()[index].card.list.length) {
        currentPageNumber = this.rulesInfo()[index].card.list.length;
      } else {
        currentPageNumber++
      }
    };
    this.rulesInfo()[index].card.currentPageNumber = currentPageNumber;
    this.addTranslatePage(index, currentPageNumber);
  };

  showSelectedPower(title: string, videoPosition: number): void {
    this.videoPowerPostion.set(videoPosition);
    let index = this.powersInfo().findIndex((power: any) => power.title === title);
    this.hidePowers();
    this.powersInfo()[index].isShown = true;
    this.videoPowerPath.set(this.powersInfo()[index].videoPath);
  }

  hidePowers(): void {
    this.powersInfo().forEach((power: any) => {
      power.isShown = false;
    });
  };

  translateX(): number {
    return this.videoPowerPostion() * 100 * -1;
  }

  translatePage(pageNumber: number): number {
    return (pageNumber - 1) * 100 * -1;
  }
  
  addTranslatePage(index: number, currentPageNumber: number): void {
    this.rulesInfo()[index].card.translate = this.translatePage(currentPageNumber);
  };

}
