import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, signal } from '@angular/core';
import { ChampionSearchComponent } from '../champion-search/champion-search.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { ChampionFilter } from '../../interfaces/champion-filter.interface';
import { ChampionRolComponent } from '../champion-rol/champion-rol.component';
import { ChampionLevelComponent } from '../champion-level/champion-level.component';

@Component({
    selector: 'app-champion-filter',
    imports: [
        ChampionSearchComponent,
        ChampionRolComponent,
        ChampionLevelComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './champion-filter.component.html',
    styleUrl: './champion-filter.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'app-champion-filter',
    }
})
export class ChampionFilterComponent implements OnInit {
  @Input() set championsData(championsData: ChampionCard[]) {
    this._championsCards.set(championsData);
    this.championsCardsFilter.set(championsData);
    this.championNameFilterFunction('');
  };

  // EMITTERS
  @Output() championCardFilterEmitter = new EventEmitter<ChampionCard[]>();

  @Output() filtersEmitter = new EventEmitter<ChampionFilter[]>();
  // END EMITTERS

  // FORMS CONTROL
  championsSearcherControl = new FormControl<string>('', {nonNullable: true});

  championsRolesControl = new FormControl<string>('', {nonNullable: true});

  levelsControl = new FormControl<boolean>(false, {nonNullable: true});
  // END FORMS CONTROL

  activeFocusSearcherInput = signal<boolean>(false);

  filters = signal<ChampionFilter[]>([]);

  idChamp = signal<string>('');

  championsNameFiltered = signal<ChampionCard[]>([]);

  private _championsCards = signal<ChampionCard[]>([]);

  championsCardsFilter = signal<ChampionCard[]>([]);

  difficultChamp = signal<number>(0);

  difficulty = signal<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  subscription = new Subscription();

  ngOnInit(): void {
    this.championsSearcherControlFunction();
    this.championsRolesControlFunction();
  }

  // FORM CONTROL SUBSCRIPTIONS

  // CARD FILTERS

  // END CARD FILTERS
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
        this.filtersEmitter.emit(this.filters());
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
    this.filtersEmitter.emit(this.filters());
  };
  // END FORM CONTROL SUBSCRIPTIONS
  
  // CARD FILTERS
  championNameFilterFunction(text: string): void {
    this.championsNameFiltered.set([]);
    text = text.toUpperCase();

    for (let champion of this._championsCards()) {
      if(champion.name.toUpperCase().indexOf(text) !== -1) {
        this.championsNameFiltered().push(champion);
      }
    }
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
    this.championCardFilterEmitter.emit(this.championsCardsFilter());
  }
  
    filterChampionByName(id: string): void {
      this.idChamp.set(id);
      this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
      const champion: ChampionCard | undefined = this._championsCards().find((ch: ChampionCard) => ch.id === id)
      this.championsSearcherControl.setValue(champion?.name || '');
      let filter = {field: 'nombre', value: this.championsSearcherControl.value};
      let index = this.filters().findIndex((element: any) => element.field === filter.field);
      if(index === -1) {
        this.filters().push(filter);
      } else {
        this.filters()[index].value = this.championsSearcherControl.value;
      }
      this.activeFocusSearcherInput.set(false);
      this.filtersEmitter.emit(this.filters());
    };
  // END CARD FILTERS

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

  // BLUR INPUTS
  blurSearcher(): void {
    setTimeout(() => this.activeFocusSearcherInput.set(false), 90);
  }

  blurDifficulty(): void {
    setTimeout(() => this.levelsControl.setValue(false), 90);
  };
  // END BLUR INPUTS

  
  // RESET FILTERS
  cleanChipFilter(field: string): void {
    let index = this.filters().findIndex((element: ChampionFilter) => element.field === field);
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

  cleanFilters(): void {
    this.championsSearcherControl.setValue('');  
    this.championsRolesControl.setValue('');
    this.difficultChamp.set(0);
    this.filters.set([]);
    
    this.champsFilter(this.idChamp(), this.championsRolesControl.value ,this.difficultChamp());
    this.filtersEmitter.emit(this.filters());
  };
  // END RESET FILTERS

}
