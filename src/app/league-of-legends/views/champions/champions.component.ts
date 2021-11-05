import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { titleAnimation } from '../../animations/title-animation';
import { AnimationsService } from '../../services/animations.service';
import { ChampionsDataService } from '../../services/champions-data.service';
import { map } from 'rxjs/operators'
import { ChampionsObject } from '../../interfaces/champions.interface';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

  interface FiltersActive {
    searcherFilter: boolean;
    rolFilter: boolean;
    difficultyFilter: boolean;
  }

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
  animations: [
    titleAnimation,
  ]
})
export class ChampionsComponent implements OnInit, OnDestroy {
  private _championsCards: ChampionCard[] = [];
  championsCardsFilter: ChampionCard[] = [];
  randomChampionsCard: ChampionCard[] = [];
  idChamp!: string;
  loading: boolean = false;

  filters: any[] = [];

  difficultChamp: number = 0;
  filtersActive: FiltersActive = {
    searcherFilter: false,
    rolFilter: false,
    difficultyFilter: false,
  }

  difficulty: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  championsNameFiltered: ChampionCard[] = [];

  activeFocusSearcherInput: boolean = false;
  activeFocusLevelInput: boolean = false;
  // FORMS CONTROL
  championsSearcherControl: FormControl;
  championsRolesControl: FormControl;
  levelsControl: FormControl;
  // END FORMS CONTROL
  // GETTING HTML ELEMENTS


  // SUBSCRIBERS
    championDataSubscriber!: Subscription;
  // END SUBSCRIBERS
  constructor(
    private animationService: AnimationsService,
    private championsDataService: ChampionsDataService,
    private router: Router
  ) {
    this.championsSearcherControl = new FormControl('');
    this.levelsControl = new FormControl(false);
    this.championsRolesControl = new FormControl('all');
    
  }

  ngOnInit(): void {
    this.championsSearcherControlFunction();
    this.championsRolesControlFunction();
    this.getChampionsData();
  }

  ngOnDestroy(): void {
    this.championDataSubscriber.unsubscribe();
  }


  deleteText(): void {
    this.championsSearcherControl.setValue('');  
  }

  championNameFilterFunction(text: string): void {
    this.championsNameFiltered = [];
    text = text.toUpperCase();
    for (let champion of this._championsCards) {
      if(champion.name.toUpperCase().indexOf(text) !== -1) {
        this.championsNameFiltered.push(champion);
      }
    }
  }

  championsSearcherControlFunction(): void {
    this.championsSearcherControl.valueChanges.subscribe((text: string) => {
      this.championNameFilterFunction(text);
      if(text.length === 0) {
        this.filtersActive.searcherFilter = false;
        this.championsCardsFilter = this._championsCards;
        if(this.championsRolesControl.value !== 'all') {
          this.nameConditionsFilter();
        }

      } else {
        this.activeFocusSearcherInput = true;
      }
    })
  }
  // GETTING DATA FROM SERVICE
  getChampionsData(): void {
    this.championDataSubscriber = this.championsDataService.getChampions()
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
        this._championsCards = champions;
        this.championsCardsFilter = this._championsCards;
        this.pushingRandomChampions();
        this.championNameFilterFunction('');
        this.loading = true;


      })
  }
  // END GETTING DATA FROM SERVICE

  // CARDS FILTERS
  filterChampionByName(id: string): void {
    this.idChamp = id;
    this.filtersActive.searcherFilter = true;
    this.championsCardsFilter = [];
    this.championsCardsFilter = this.filterArrayById(this._championsCards, id);
    this.championsSearcherControl.setValue(this.championsCardsFilter[0].name);
    let filter = {field: 'nombre', value: this.championsSearcherControl.value};
    let index = this.filters.findIndex((element: any) => element.field === filter.field);
    if(index === -1) {
      this.filters.push(filter);
    } else {
      this.filters[index].value = this.championsSearcherControl.value;
    }
    this.nameConditionsFilter();
    this.activeFocusSearcherInput = false;

  }

  championsRolesControlFunction(): void {
    this.championsRolesControl.valueChanges.subscribe((rol: string) => {
      
      if(rol !== 'all') {
        this.filtersActive.rolFilter = true;
        this.championsCardsFilter = this.filterArrayByRoles(this._championsCards, rol);
        this.rolesConditionsFilters();
        let filter = {field: 'rol', value: rol};
        let index = this.filters.findIndex((element: any) => element.field === filter.field);
        if(index === -1) {
          this.filters.push(filter);
        } else {
          this.filters[index].value = rol;
        }
      } else {
        this.filtersActive.rolFilter = false;
        this.championsCardsFilter = this._championsCards;
        this.rolesConditionsFilters();


      }
    })
  }

  filterChampionByDifficulty(difficulty: number): void {
    this.difficultChamp = difficulty;
    this.championsCardsFilter = [];
    this.filtersActive.difficultyFilter = true;
    this.championsCardsFilter = this.filterArrayByDifficulty(this._championsCards, difficulty);
    this.difficultConditionsFilters();
    let filter = {field: 'dificultad', value: difficulty};
    let index = this.filters.findIndex((element: any) => element.field === filter.field);
    if(index === -1) {
      this.filters.push(filter);
    } else {
      this.filters[index].value = difficulty;
    }
  
  }
  // END CARDS FILTERS 

  // BLUR INPUTS
  blurSearcher(): void {
    setTimeout(() => this.activeFocusSearcherInput = false, 90);
  }
  blurDifficulty(): void {
    setTimeout(() => this.levelsControl.setValue(false), 90);
  }
  // END BLUR INPUTS

  // CONDITIONS TO APPLY THE FILTERS

  nameConditionsFilter(): void {
    if(this.filtersActive.difficultyFilter && !this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayByDifficulty(this.championsCardsFilter, this.difficultChamp);
    } else if(!this.filtersActive.difficultyFilter && this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayByRoles(this.championsCardsFilter, this.championsRolesControl.value);
    } else if(this.filtersActive.difficultyFilter && this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayByDifficulty(this.championsCardsFilter, this.difficultChamp);
      this.championsCardsFilter = this.filterArrayByRoles(this.championsCardsFilter, this.championsRolesControl.value);
    }
  }

  rolesConditionsFilters(): void {
    if(this.filtersActive.searcherFilter && !this.filtersActive.difficultyFilter) {
      this.championsCardsFilter = this.filterArrayById(this.championsCardsFilter, this.idChamp)
    } else if(!this.filtersActive.searcherFilter && this.filtersActive.difficultyFilter) {
      this.championsCardsFilter = this.filterArrayByDifficulty(this.championsCardsFilter, this.difficultChamp);
    } else if(this.filtersActive.searcherFilter && this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayById(this.championsCardsFilter, this.idChamp)
      this.championsCardsFilter = this.filterArrayByDifficulty(this.championsCardsFilter, this.difficultChamp);
    }
  }

  difficultConditionsFilters(): void {
    if(this.filtersActive.searcherFilter && !this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayById(this.championsCardsFilter, this.idChamp);

    } else if(!this.filtersActive.searcherFilter && this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayByRoles(this.championsCardsFilter, this.championsRolesControl.value);
      
    } else if(this.filtersActive.searcherFilter && this.filtersActive.rolFilter) {
      this.championsCardsFilter = this.filterArrayById(this.championsCardsFilter, this.idChamp)
      this.championsCardsFilter = this.filterArrayByRoles(this.championsCardsFilter, this.championsRolesControl.value);
    }
  }
  // END CONDITIONS TO APPLY THE FILTERS

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
  }

  // END ARRAY FILTERS

  // RESET FILTERS
  cleanFilters(): void {
    this.deleteText();
    this.championsRolesControl.setValue('all');
    this.resetDifficultFilters();
    this.filters = [];

  }

  resetDifficultFilters(): void {
    this.difficultChamp = 0;
    this.filtersActive.difficultyFilter = false;
    this.championsCardsFilter = this._championsCards;
    this.difficultConditionsFilters();
  }

  // END RESET FILTERS

  randomChampions(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);

  }

  pushingRandomChampions(): void {
    this.randomChampionsCard = [];
    for(let i = 0; i < 4; i++) {
      let number = this.randomChampions(this._championsCards.length)
      this.randomChampionsCard.push(this._championsCards[number]);
    }
  };

  cleanChipFilter(field: string): void {
    let index = this.filters.findIndex((element: any) => element.field === field);
    this.filters.splice(index, 1);
    
    switch (field.toLowerCase()) {
      case 'nombre':
        this.deleteText();
        break;
      case 'rol':
        // this.rolesConditionsFilters();
        this.championsRolesControl.setValue('all');
        break;
      case 'dificultad':
        this.resetDifficultFilters();
        break;
    
      default:
        break;
      }

  }

  goTo(id: string): void {
    this.router.navigate(['/main/champion', id]);
  }

}
