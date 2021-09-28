import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { titleAnimation } from '../../animations/title-animation';
import { AnimationsService } from '../../services/animations.service';
import { ChampionsDataService } from '../../services/champions-data.service';
import { map } from 'rxjs/operators'
import { ChampionsObject } from '../../interfaces/champions.interface';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { Subscriber, Subscription } from 'rxjs';

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
export class ChampionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private _championsCards: ChampionCard[] = [];
  findYourChampTitleAnimation: boolean = true;
  championsCardsFilter: ChampionCard[] = [];
  randomChampionsCard: ChampionCard[] = [];
  idChamp!: string;
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
  @ViewChild('findYourChamp') findYourChamp!: ElementRef;
  // END GETTING HTML ELEMENTS
  findYourChampOffsetTop!: number;
  findYourChampOffsetHeight!: number;

  // SUBSCRIBERS
    championDataSubscriber!: Subscription;
  // END SUBSCRIBERS
  constructor(
    private animationService: AnimationsService,
    private championsDataService: ChampionsDataService
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

  
    ngAfterViewInit(): void {
      // this.findYourChampOffsetTop = this.findYourChamp.nativeElement.offsetTop;
      // this.findYourChampOffsetHeight = this.findYourChamp.nativeElement.offsetHeight;
    }
  @HostListener('window:scroll', ['$event'])
  scrollDetection(event: any): void {
    let scrollTop = event.srcElement.scrollingElement.scrollTop;
    let clientHeight = event.srcElement.scrollingElement.clientHeight;
    let scrollPositionY = scrollTop + clientHeight;

    let findYourRolPositionY = this.findYourChampOffsetTop + this.findYourChampOffsetHeight;
    this.findYourChampTitleAnimation = this.animationService.positionYFadeIn(findYourRolPositionY, scrollPositionY);

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
      if(text.length === 0 && this.championsRolesControl.value !== 'all') {
        this.filtersActive.searcherFilter = false;
        this.championsCardsFilter = this._championsCards;
        this.nameConditionsFilter();
        this.filtersActive.searcherFilter = false;
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
          console.log(championsArr);
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
    this.nameConditionsFilter();
    this.activeFocusSearcherInput = false;

  }

  championsRolesControlFunction(): void {
    this.championsRolesControl.valueChanges.subscribe((rol: string) => {
      this.filtersActive.rolFilter = true;
      if(rol === 'all') {
        this.championsCardsFilter = this.cleanFilters();
      } else {
        this.championsCardsFilter = this.filterArrayByRoles(this._championsCards, rol);
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
      this.championsCardsFilter = this.filterArrayById(this.championsCardsFilter, this.idChamp)
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
    // if(roles === 'all' && this.filtersActive.rolFilter) {
    //   return this.cleanFilters();
    // } else {
    // }
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
  cleanFilters(): ChampionCard[] {
    this.championsSearcherControl.setValue('');
    this.difficultChamp = 0;
    this.filtersActive.searcherFilter = false;
    this.filtersActive.rolFilter = false;
    this.filtersActive.difficultyFilter = false;
    this.activeFocusSearcherInput = false;
    return this._championsCards; 
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

}
