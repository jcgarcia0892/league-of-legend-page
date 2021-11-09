import { transition, trigger, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { fadeAnimation } from '../../animations/fade-in-animation';
import { ChampionsDataService } from '../../services/champions-data.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import { Subscription } from 'rxjs';
import { Champion, Skill } from '../../interfaces/champion.interface';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Pagination]);

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition("* <=> *", useAnimation(fadeAnimation, {
        params: {
          start: 0,
          end: 1,
          time: '.3s'
        }
      }))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ChampionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('skillSelectedHtml') skillSelectedHtml!: ElementRef;
  skillsControl: FormControl;
  champion!: Champion;
  idChamp!: string;
  imgUrl!: string;
  fadeAnimation: boolean = true;
  getChampionObs!: Subscription;
  loading: boolean = false;

  thumbsSwiper: any;  

  constructor(
    private acRoute: ActivatedRoute,
    private championsDataService: ChampionsDataService,
  ) {
    this.skillsControl = new FormControl('');
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.getChampionObs = this.acRoute.params
      .pipe(
        switchMap(({id}) => {
          this.idChamp = id;
          return this.championsDataService.getChampion(id)
        }),
        map(({data}) => {
          data[this.idChamp].imgSplash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.idChamp}_0.jpg`;
          data[this.idChamp].imgSquare = `http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${this.idChamp}.png`;
          data[this.idChamp].imgLoading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.idChamp}_0.jpg`;
          data[this.idChamp].skills = [];
          data[this.idChamp].skillSelected = {};
          data[this.idChamp].rolArray = [];
          for(let rol of data[this.idChamp].tags) {
            data[this.idChamp].rolArray.push(this.translateRol(rol));
          }
          data[this.idChamp].skills.push(this.mapSkills(data[this.idChamp].passive));
          
          for(let i = 0; i < data[this.idChamp].spells.length; i++) {
            data[this.idChamp].skills.push(this.mapSkills(data[this.idChamp].spells[i], i));
          }
          delete data[this.idChamp].spells;
          delete data[this.idChamp].stats;
          return data[this.idChamp]
        })
      )

    .subscribe((data: Champion) => {
      this.champion = data;
      this.champion.skills[0].checked = true;
      this.skillsControl.setValue(this.champion.skills[0].name);
      this.loading = true;
    });

    this.skillsControlObservable();
  }

  ngOnDestroy(): void {
    this.getChampionObs.unsubscribe();
  }


  skillsControlObservable(): void {
    this.skillsControl.valueChanges.subscribe((skillName: string) => {
      this.showSkills(skillName);
      this.fadeAnimation = !this.fadeAnimation;
    })
  }

  translateRol(value: string): string {
    console.log(value);
    switch (value) {
      case 'Assassin':
        return 'Asesino';
      case 'Fighter':
        return 'Luchador';
      case 'Mage':
        return 'Mago';
      case 'Marksman':
        return 'Tirador';
      case 'Support':
        return 'Soporte';
      default:
        return 'Tanque';
    }
  }

  mapSkills(element: any, index: number = 5): Skill {
    let key = '';
    let {id, name, description, image} = element;
    switch (index) {
      case 0:
        key = 'Q'
        break;
      case 1:
        key = 'W'
        break;
      case 2:
        key = 'E'
        break;
      case 3:
        key = 'R'
        break;
      default:
        key = 'Pasiva'
        break;
    }
    return {
      // id,
      checked: false,
      name,
      description,
      img: `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/${image.group}/${image.full}`,
      key
    }

  }

  showSkills(skillName: string): void {
    let index = this.champion.skills.findIndex((skill: Skill) => skill.name === skillName);
    for(let skill of this.champion.skills) {
      skill.checked = false;
    };
    this.champion.skills[index].checked = true;
    this.champion.skillSelected = this.champion.skills[index];
    this.skillSelectedHtml.nativeElement.innerHTML = this.showSkillSelectedHTML(index);

  }

  showSkillSelectedHTML(index: number): string {
    return `
    <p class="champion__skills__container__description__skill">${this.champion.skills[index].key}</p>
    <h4>${this.champion.skills[index].name}</h4>
    <p class="champion__skills__container__description__text">${this.champion.skills[index].description}</p>
    `;
  }

  onSwiper(swiper: any) {
  }
  onSlideChange() {
  }

}
