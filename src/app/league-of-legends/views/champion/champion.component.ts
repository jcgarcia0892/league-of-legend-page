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
  baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn';

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
        map(({data, version}) => {
          const imagesPath = this.getImagesPath(this.idChamp, version);
          const skills = [];
          const skillSelected = {};
          const rolArray = [];
          for(let rol of data[this.idChamp].tags) {
            rolArray.push(this.translateRol(rol));
          }
          skills.push(this.mapSkills(data[this.idChamp].passive, version));
          
          for(let i = 0; i < data[this.idChamp].spells.length; i++) {
            skills.push(this.mapSkills(data[this.idChamp].spells[i], version, i));
          }
          const {spells, stats, blurb, info, partype, recommended, ...champProps} = data[this.idChamp]
          const champion: Champion = {
            skills,
            rolArray,
            ...imagesPath,
            ...champProps
          }
          return champion;
        })
      )

    .subscribe((champion: Champion) => {
      this.champion = champion;
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

  mapSkills(element: any, version: string, index: number = 5,): Skill {
    let key = '';
    let {name, description, image} = element;
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
      checked: false,
      name,
      description,
      img: `${this.baseUrl}/${version}/img/${image.group}/${image.full}`,
      key
    }

  }

  showSkills(skillName: string): void {
    let index = this.champion.skills.findIndex((skill: Skill) => skill.name === skillName);
    for(let skill of this.champion.skills) {
      skill.checked = false;
    };
    this.champion.skills[index].checked = true;
    this.skillSelectedHtml.nativeElement.innerHTML = this.showSkillSelectedHTML(index);

  }

  showSkillSelectedHTML(index: number): string {
    return `
    <p class="champion__skills__container__description__skill">${this.champion.skills[index].key}</p>
    <h4>${this.champion.skills[index].name}</h4>
    <p class="champion__skills__container__description__text">${this.champion.skills[index].description}</p>
    `;
  }

  getImagesPath(idChamp: string, version: string): {imgSplash: string, imgSquare: string, imgLoading: string} {
    const imgSplash = `${this.baseUrl}/img/champion/splash/${idChamp}_0.jpg`;
    const imgSquare = `${this.baseUrl}/${version}/img/champion/${idChamp}.png`;
    const imgLoading = `${this.baseUrl}/img/champion/loading/${idChamp}_0.jpg`;
    return {
      imgSplash,
      imgSquare,
      imgLoading
    }
  }

  onSwiper(swiper: any) {
  }
  onSlideChange() {
  }

}
