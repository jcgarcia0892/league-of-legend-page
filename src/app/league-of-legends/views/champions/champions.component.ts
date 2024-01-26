import { Component, OnDestroy, OnInit, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { titleAnimation } from '../../animations/title-animation';
import { ChampionsDataService } from '../../services/champions-data.service';
import { ChampionsObject } from '../../interfaces/champions.interface';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { ChampionFilter } from '../../interfaces/champion-filter.interface';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { ChampionFilterComponent } from '../../components/champion-filter/champion-filter.component';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    CardComponent,
    ChampionFilterComponent,
    LoadingComponent,
  ],
  animations: [
    titleAnimation,
  ]
})
export class ChampionsComponent implements OnInit, OnDestroy {

  @ViewChild(ChampionFilterComponent) championFilterComponent!: ChampionFilterComponent;

  championsCards = signal<ChampionCard[]>([]);

  championsCardsFilter = signal<ChampionCard[]>([]);
  
  randomChampionsCard = signal<ChampionCard[]>([]);
  
  filters = signal<ChampionFilter[]>([]);
  
  loading = signal<boolean>(false);

  private championsDataService = inject(ChampionsDataService);

  // SUBSCRIBERS
    subscription = new Subscription();
  // END SUBSCRIBERS

  ngOnInit(): void {
    this.getChampionsData();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  // GETTING DATA FROM SERVICE
  getChampionsData(): void {
    const subscription = this.championsDataService.getChampions()
      .pipe(
        map((champions: ChampionsObject) => {
          let championsCards: ChampionCard[] = [];
          let championsArr: any = Object.values(champions.data);
          for(let champion of championsArr) {
            const name = champion.name;
            const img = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
            const id = champion.id;
            const difficulty = champion.info.difficulty;
            const roles = champion.tags;
            championsCards.push({name, img, id, difficulty, roles});
          }
          return championsCards;
        })
      )
      .subscribe((champions: ChampionCard[]) => {
        this.championsCards.set(champions);
        this.championsCardsFilter.set(this.championsCards());
        this.pushingRandomChampions();
        this.loading.set(true);


      });
    this.subscription.add(subscription);
  };
  // END GETTING DATA FROM SERVICE

  randomChampions(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
  };

  pushingRandomChampions(): void {
    this.randomChampionsCard.set([]);
    for(let i = 0; i < 4; i++) {
      let number = this.randomChampions(this.championsCards().length)
      this.randomChampionsCard.update((championCard) => [...championCard, this.championsCards()[number]]);
    }
  };

  cleanChipFilter(field: string): void {
    this.championFilterComponent.cleanChipFilter(field);
  };

  // RESET FILTERS
  cleanFilters(): void {
    this.championFilterComponent.cleanFilters();
  };
  // END RESET FILTERS

}
