import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { NoImageDirective } from '../../directives/noImage/no-image.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NoImageDirective,
  ]
})
export class CardComponent {
  @Input() championCard!: ChampionCard;

  constructor(private router: Router) {}

  goTo(id: string): void {
    this.router.navigate(['/main/champion', id]);
  }
}
