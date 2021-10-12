import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit, AfterViewInit {
  @ViewChild('rulesVideo') rulesVideo!: ElementRef;
  @ViewChild('rules') rules!: ElementRef;
  videoPath!: string;
  videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];
  scrollPositionY: number = 0;
  constructor() {
  }

  ngOnInit(): void {
    this.videoPath = `assets/videos/${this.videoPaths[this.randomNumber()]}.mp4`;

  }

  ngAfterViewInit(): void {
    this.playToVideo();
  }

  playToVideo(): void {
    this.rulesVideo.nativeElement.muted = true;
    this.rulesVideo.nativeElement.play();
  }
  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths.length);
  };

  scrollToRules(): void {
    console.log(this.rules.nativeElement.getBoundingClientRect().top);
    window.scrollTo({
      top: this.rules.nativeElement.getBoundingClientRect().top,
      behavior: 'smooth'
    });
  }

}
