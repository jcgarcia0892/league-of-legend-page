import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { fadeAnimation } from '../../animations/fade-in-animation';
import { ChampionsDataService } from '../../services/champions-data.service';
import { Champion, Skill } from '../../interfaces/champion.interface';
import { LoadingComponent } from '../../components/loading/loading.component';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import { SwiperModule } from 'swiper/angular';
import { SkillSelectionComponent } from '../../components/skill-selection/skill-selection.component';
import { SwiperSkinComponent } from '../../components/swiper-skin/swiper-skin.component';
import { ButtonComponent } from '../../components/button/button.component';


// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Pagination]);

@Component({
    selector: 'app-champion',
    templateUrl: './champion.component.html',
    styleUrls: ['./champion.component.scss'],
    imports: [
        ReactiveFormsModule,
        RouterModule,
        SwiperModule,
        ButtonComponent,
        LoadingComponent,
        SkillSelectionComponent,
        SwiperSkinComponent,
    ],
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
    host: {
        'class': 'app-champion'
    }
})
export class ChampionComponent implements OnInit, OnDestroy {
  @ViewChild('skillSelectedHtml') skillSelectedHtml!: ElementRef;

  skillsControl = new FormControl<string>('', {nonNullable: true});

  champion = signal<Champion | undefined>(undefined);

  skillSelected = computed(() => this.champion()?.skills.find(skill => skill.checked));

  idChamp = signal<string>('');

  fadeAnimation = signal<boolean>(true);

  canFindChampion = signal<boolean>(false);

  subscription = new Subscription();

  loading = signal<boolean>(false);

  baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn';

  private acRoute = inject(ActivatedRoute);

  private championsDataService = inject(ChampionsDataService);

  private router = inject(Router);

  private chDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      const skillSelected = this.skillSelected();
      if(skillSelected) {
        this.skillSelectedHtml.nativeElement.innerHTML = this.showSkillSelectedHTML(skillSelected);
      }
    });
  }

  ngOnInit(): void {
    this.skillsControlObservable();
    const subscription = this.acRoute.params
      .pipe(
        switchMap(({id}) => {
          this.idChamp.set(id);
          return this.championsDataService.getChampion(id)
        }),
        map(({data, version}) => {
          const imagesPath = this.getImagesPath(this.idChamp(), version);
          const skills = [];
          const rolArray = [];
          for(let rol of data[this.idChamp()].tags) {
            rolArray.push(this.translateRol(rol));
          }
          skills.push(this.mapSkills(data[this.idChamp()].passive, version));
          
          for(let i = 0; i < data[this.idChamp()].spells.length; i++) {
            skills.push(this.mapSkills(data[this.idChamp()].spells[i], version, i));
          }
          skills[0].checked = true;
          const {spells, stats, blurb, info, partype, recommended, ...champProps} = data[this.idChamp()]
          const champion: Champion = {
            skills,
            rolArray,
            ...imagesPath,
            ...champProps
          }
          return champion;
        })
      )

    .subscribe({
      next: (champion: Champion) => {
        this.champion.set(champion);
        this.loading.set(true);
        this.canFindChampion.set(true);
        this.chDetectorRef.detectChanges();
        this.skillsControl.setValue(this.champion()!.skills[0].name);
      },
      error: () => {
        this.canFindChampion.set(false);
        this.loading.set(true);
      }
    });
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  skillsControlObservable(): void {
    const subscription = this.skillsControl.valueChanges.subscribe((skillName: string) => {
      this.showSkills(skillName);
      this.fadeAnimation.update((value) => !value);
    });
    this.subscription.add(subscription);
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
    if(!this.champion()) return;
    this.champion.update((champion) => {
      let index = champion!.skills.findIndex((skill: Skill) => skill.name === skillName);
      for(let skill of champion!.skills) {
        skill.checked = false;
      };
      champion!.skills[index].checked = true;
      return {...champion!};
    })

  }

  showSkillSelectedHTML(skillSelected: Skill): string {
    const {key, name, description} = skillSelected;
    return `
      <p class="champion__skills__container__description__skill">${key}</p>
      <h4>${name}</h4>
      <p class="champion__skills__container__description__text">${description}</p>
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

  goTo(url: string): void {
    this.router.navigate([url]);
  }
}
