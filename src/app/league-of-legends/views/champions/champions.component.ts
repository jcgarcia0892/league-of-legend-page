import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { titleAnimation } from '../../animations/title-animation';
import { ChampionsDataService } from '../../services/champions-data.service';
import { ChampionsObject } from '../../interfaces/champions.interface';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { ChampionFilter } from '../../interfaces/champion-filter.interface';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
  animations: [
    titleAnimation,
  ]
})
export class ChampionsComponent implements OnInit, OnDestroy {
  private _championsCards = signal<ChampionCard[]>([]);

  championsCardsFilter = signal<ChampionCard[]>([]);

  randomChampionsCard = signal<ChampionCard[]>([]);

  idChamp = signal<string>('');

  loading = signal<boolean>(false);

  filters = signal<ChampionFilter[]>([]);

  difficultChamp = signal<number>(0);

  difficulty = signal<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  championsNameFiltered = signal<ChampionCard[]>([]);

  activeFocusSearcherInput = signal<boolean>(false);

  // FORMS CONTROL
  championsSearcherControl: UntypedFormControl;

  championsRolesControl: UntypedFormControl;

  levelsControl: UntypedFormControl;
  // END FORMS CONTROL

  // SUBSCRIBERS
    subscription = new Subscription();
  // END SUBSCRIBERS

  constructor(
    private championsDataService: ChampionsDataService,
  ) {
    this.championsSearcherControl = new UntypedFormControl('');
    this.levelsControl = new UntypedFormControl(false);
    this.championsRolesControl = new UntypedFormControl('');
    
  };

  ngOnInit(): void {
    this.championsSearcherControlFunction();
    this.championsRolesControlFunction();
    this.getChampionsData();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  championNameFilterFunction(text: string): void {
    this.championsNameFiltered.set([]);
    text = text.toUpperCase();
    for (let champion of this._championsCards()) {
      if(champion.name.toUpperCase().indexOf(text) !== -1) {
        this.championsNameFiltered().push(champion);
      }
    }
  };

  championsSearcherControlFunction(): void {
    const subscription = this.championsSearcherControl.valueChanges.subscribe((text: string) => {
      this.championNameFilterFunction(text);
      this.idChamp.set(text);
      if(text.length !== 0) {
        this.activeFocusSearcherInput.set(true);
      }
    });
    this.subscription.add(subscription);
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
        this._championsCards.set(champions);
        this.championsCardsFilter.set(this._championsCards());
        this.pushingRandomChampions();
        this.championNameFilterFunction('');
        this.loading.set(true);


      });
    this.subscription.add(subscription);
  };
  // END GETTING DATA FROM SERVICE

  // CARDS FILTERS
  filterChampionByName(id: string): void {
    this.idChamp.set(id);
    this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
    const champion: ChampionCard | undefined = this._championsCards().find((ch: ChampionCard) => ch.id === id)
    this.championsSearcherControl.setValue(champion?.name);
    let filter = {field: 'nombre', value: this.championsSearcherControl.value};
    let index = this.filters().findIndex((element: any) => element.field === filter.field);
    if(index === -1) {
      this.filters().push(filter);
    } else {
      this.filters()[index].value = this.championsSearcherControl.value;
    }
    this.activeFocusSearcherInput.set(false);
  };

  championsRolesControlFunction(): void {
    const subscription = this.championsRolesControl.valueChanges.subscribe((rol: string) => {
      this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
      if(rol !== '') {
        let filter = {field: 'rol', value: rol};
        let index = this.filters().findIndex((element: any) => element.field === filter.field);
        if(index === -1) {
          this.filters().push(filter);
        } else {
          this.filters()[index].value = rol;
        }
      }
    });

    this.subscription.add(subscription);
  };

  filterChampionByDifficulty(difficulty: number): void {
    this.difficultChamp.set(difficulty);
    this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
    let filter = {field: 'dificultad', value: difficulty};
    let index = this.filters().findIndex((element: any) => element.field === filter.field);
    if(index === -1) {
      this.filters().push(filter);
    } else {
      this.filters()[index].value = difficulty;
    }
  
  };
  // END CARDS FILTERS 

  // BLUR INPUTS
  blurSearcher(): void {
    setTimeout(() => this.activeFocusSearcherInput.set(false), 90);
  };
  blurDifficulty(): void {
    setTimeout(() => this.levelsControl.setValue(false), 90);
  };
  // END BLUR INPUTS

  // ARRAY FILTERS

  filterArrayById(array: ChampionCard[], id: string): ChampionCard[] {
    return array.filter((element) => element.id === id);
  };

  filterArrayByDifficulty(array: ChampionCard[], difficulty: number): ChampionCard[] {
    return array.filter((element) => element.difficulty === difficulty);
  };

  filterArrayByRoles(array: ChampionCard[], roles: string): ChampionCard[] {
    let championsCards: ChampionCard[] = [];
    championsCards = array.filter((element) => {
      for(let rol of element.roles) {
        return rol.toLocaleLowerCase() === roles;
      }
      return;
    })
    return championsCards;
  };

  // END ARRAY FILTERS

  // RESET FILTERS
  cleanFilters(): void {
    this.championsSearcherControl.setValue('');  
    this.championsRolesControl.setValue('');
    this.difficultChamp.set(0);
    this.filters.set([]);
    
    this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
  };

  // END RESET FILTERS

  randomChampions(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
  };

  pushingRandomChampions(): void {
    this.randomChampionsCard.set([]);
    for(let i = 0; i < 4; i++) {
      let number = this.randomChampions(this._championsCards().length)
      this.randomChampionsCard.update((championCard) => [...championCard, this._championsCards()[number]]);
    }
  };

  cleanChipFilter(field: string): void {
    let index = this.filters().findIndex((element: any) => element.field === field);
    this.filters().splice(index, 1);
    
    switch (field.toLowerCase()) {
      case 'nombre':
        this.championsSearcherControl.setValue('');  
        break;
      case 'rol':
        this.championsRolesControl.setValue('');
        break;
      case 'dificultad':
        this.difficultChamp.set(0);
        break;
    };
    this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
  };

  champsFilter(id: string, rol: string, difficulty: number): any {
    let filter = this._championsCards();

    if(id) {
      filter = this.filterArrayById(filter, id);
    };
    
    if(rol) {
      filter = this.filterArrayByRoles(filter, rol);
    };

    if(difficulty) {
      filter = this.filterArrayByDifficulty(filter, difficulty);
    }
    this.championsCardsFilter.set(filter);
  }

}
