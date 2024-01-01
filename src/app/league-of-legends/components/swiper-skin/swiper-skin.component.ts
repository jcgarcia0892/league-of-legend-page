import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import Swiper from 'swiper';
import { Skin } from '../../interfaces/champion-resp.interface';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-swiper-skin',
  standalone: true,
  imports: [
    NgForOf,
    SwiperModule,
  ],
  templateUrl: './swiper-skin.component.html',
  styleUrl: './swiper-skin.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'app-swiper-skin',
  },
})
export class SwiperSkinComponent {
  @Input({required: true}) skins: Skin[] = [];
  @Input({required: true}) name!: string;

  @Input({required: true}) idChamp!: string;

  thumbsSwiper!: Swiper;
}
