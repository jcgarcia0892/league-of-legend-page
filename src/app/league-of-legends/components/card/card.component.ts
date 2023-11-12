import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChampionCard } from '../../interfaces/champion-card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() championCard!: ChampionCard;

  constructor(private router: Router) {}

  goTo(id: string): void {
    this.router.navigate(['/main/champion', id]);
  }
}
