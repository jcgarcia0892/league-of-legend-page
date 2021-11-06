import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { titleAnimation } from '../../animations/title-animation';
import { ChampionsDataService } from '../../services/champions-data.service';
import { map } from 'rxjs/operators'
import { ChampionsObject } from '../../interfaces/champions.interface';
import { ChampionCard } from '../../interfaces/champion-card.interface';
import { Subscription } from 'rxjs';

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
    private championsDataService: ChampionsDataService,
  ) {
    this.championsSearcherControl = new FormControl('');
    this.levelsControl = new FormControl(false);
    this.championsRolesControl = new FormControl('');
    
  };

  ngOnInit(): void {
    this.championsSearcherControlFunction();
    this.championsRolesControlFunction();
    this.getChampionsData();
  };

  ngOnDestroy(): void {
    this.championDataSubscriber.unsubscribe();
  };

  championNameFilterFunction(text: string): void {
    this.championsNameFiltered = [];
    text = text.toUpperCase();
    for (let champion of this._championsCards) {
      if(champion.name.toUpperCase().indexOf(text) !== -1) {
        this.championsNameFiltered.push(champion);
      }
    }
  };

  championsSearcherControlFunction(): void {
    this.championsSearcherControl.valueChanges.subscribe((text: string) => {
      this.championNameFilterFunction(text);
      this.idChamp = text;
      if(text.length !== 0) {
        this.activeFocusSearcherInput = true;
      }
    })
  };
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
  };
  // END GETTING DATA FROM SERVICE

  // CARDS FILTERS
  filterChampionByName(id: string): void {
    this.idChamp = id;
    this.filtradorImprovisado(this.idChamp, this.championsRolesControl.value ,this.difficultChamp);
    const champion: ChampionCard | undefined = this._championsCards.find((ch: ChampionCard) => ch.id === id)
    this.championsSearcherControl.setValue(champion?.name);
    let filter = {field: 'nombre', value: this.championsSearcherControl.value};
    let index = this.filters.findIndex((element: any) => element.field === filter.field);
    if(index === -1) {
      this.filters.push(filter);
    } else {
      this.filters[index].value = this.championsSearcherControl.value;
    }
    this.activeFocusSearcherInput = false;

  };

  championsRolesControlFunction(): void {
    this.championsRolesControl.valueChanges.subscribe((rol: string) => {
      this.filtradorImprovisado(this.idChamp, this.championsRolesControl.value ,this.difficultChamp);
      if(rol !== '') {
        let filter = {field: 'rol', value: rol};
        let index = this.filters.findIndex((element: any) => element.field === filter.field);
        if(index === -1) {
          this.filters.push(filter);
        } else {
          this.filters[index].value = rol;
        }
      }
    })
  };

  filterChampionByDifficulty(difficulty: number): void {
    this.difficultChamp = difficulty;
    this.filtradorImprovisado(this.idChamp, this.championsRolesControl.value ,this.difficultChamp);
    let filter = {field: 'dificultad', value: difficulty};
    let index = this.filters.findIndex((element: any) => element.field === filter.field);
    if(index === -1) {
      this.filters.push(filter);
    } else {
      this.filters[index].value = difficulty;
    }
  
  };
  // END CARDS FILTERS 

  // BLUR INPUTS
  blurSearcher(): void {
    setTimeout(() => this.activeFocusSearcherInput = false, 90);
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
    this.difficultChamp = 0;
    this.filters = [];
    this.filtradorImprovisado(this.idChamp, this.championsRolesControl.value ,this.difficultChamp);
  };

  // END RESET FILTERS

  randomChampions(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
  };

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
        this.championsSearcherControl.setValue('');  
        break;
      case 'rol':
        this.championsRolesControl.setValue('');
        break;
      case 'dificultad':
        this.difficultChamp = 0;
        break;
    };
    this.filtradorImprovisado(this.idChamp, this.championsRolesControl.value ,this.difficultChamp);
    
    
  };

  filtradorImprovisado(id: string = '', rol: string = '', difficulty: number = 0): any {
    let filtrador = this._championsCards;

    if(id) {
      filtrador = this.filterArrayById(filtrador, id);
    };
    
    if(rol) {
      filtrador = this.filterArrayByRoles(filtrador, rol);
    };

    if(difficulty) {
      filtrador = this.filterArrayByDifficulty(filtrador, difficulty);
    }
    this.championsCardsFilter = filtrador;

  }

}
