import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { fadeAnimation, fadeInAnimation, sasa } from '../../animations/fade-in-animation';
import { ChampionsDataService } from '../../services/champions-data.service';

interface Rol {
  value: string;
  spanish: string;
}

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
export class ChampionComponent implements OnInit, AfterViewInit {
  @ViewChild('skillSelectedHtml') skillSelectedHtml!: ElementRef;
  skillsControl: FormControl;
  champion!: any;
  idChamp!: string;
  imgUrl!: string;
  prueba: boolean = true;

  rolArray: Rol[] = [
    {
      value: 'Assassin',
      spanish: 'Asesino'
    },
    {
      value: 'Fighter',
      spanish: 'Luchador'
    },
    {
      value: 'Mage',
      spanish: 'Mago'
    },
    {
      value: 'Marksman',
      spanish: 'Tirador'
    },
    {
      value: 'Support',
      spanish: 'Soportes'
    },
    {
      value: 'Tank',
      spanish: 'Tanque'
    },
  ]
    
  

  constructor(
    private acRoute: ActivatedRoute,
    private championsDataService: ChampionsDataService,
    private render: Renderer2
  ) {
    this.skillsControl = new FormControl('');
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.acRoute.params
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
          // data[this.idChamp].skills.push(this.skills(data[this.idChamp].passive));
          data[this.idChamp].rolArray = [];
          for(let rol of data[this.idChamp].tags) {
            data[this.idChamp].rolArray.push(this.translateRol(rol));
          }
          data[this.idChamp].skills.push(this.skills(data[this.idChamp].passive));
          
          for(let i = 0; i < data[this.idChamp].spells.length; i++) {
            data[this.idChamp].skills.push(this.skills(data[this.idChamp].spells[i], i));
          }
          return data[this.idChamp]
        })
      )

    .subscribe((data: any) => {
      this.champion = data;
      this.champion.skills[0].checked = true;
      this.skillsControl.setValue(this.champion.skills[0].name);

      console.log(this.champion);
    });

    this.skillsControlFunction();
  }


  skillsControlFunction(): void {
    this.skillsControl.valueChanges.subscribe((skillName: string) => {
      this.showSkills(skillName);
      this.prueba = !this.prueba;
    })
  }

  translateRol(value: string): any {
    let index = this.rolArray.findIndex((rol: Rol) => {
      return rol.value === value;
    });
    return this.rolArray[index].spanish;

  }

  skills(element: any, index: number = 5): any {
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
    let index = this.champion.skills.findIndex((skill: any) => skill.name === skillName);
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

}
