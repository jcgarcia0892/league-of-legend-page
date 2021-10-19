import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit, AfterViewInit {
  @ViewChild('rulesVideo') rulesVideo!: ElementRef;
  @ViewChild('getExp') getExp!: ElementRef;
  @ViewChild('getGold') getGold!: ElementRef;
  @ViewChild('rules') rules!: ElementRef;
  videoPath!: string;
  videoPaths: string[] = ['caitlyn', 'kaisa', 'sylas-entrace', 'sylas'];
  scollInY: number = 0;
  prueba: boolean = false;
  videoPowerPath: string = 'assets/images/get-gold.webm';
  videoPowerPostion = 0;
  rulesInfo: any[] = [
    {
      header: {
        subtitle: 'objetivo',
        title: 'Destruye la base enemiga',
        descriptions: [
          'El nexo es el corazón de las bases de ambos equipos.',
          'Destruye el nexo enemigo para ganar la partida.'
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: function() {
          return (this.currentPageNumber - 1) * 100 * -1;
        },
        list: [
          {title: 'tu nexo', description: 'Tu nexo es donde los aparecen los súbditos. Detrás de tu nexo se encuentra el fondo de la base, donde puedes recuperar vida y maná rápidamente, así como acceder a la tienda.'},
          {title: 'Nexo enemigo', description: 'Situado en la base del equipo enemigo, el nexo enemigo es igual al tuyo. Al destruir el nexo enemigo, tu equipo gana la partida.'}
        ],
      }
    },
    {
      header: {
        subtitle: 'estructuras',
        title: 'Despeja el camino',
        descriptions: [
          'Tu equipo debe despejar al menos un carril para llegar al nexo enemigo. En tu camino se interponen estructuras defensivas denominadas torretas e inhibidores. Cada carril cuenta con tres torretas y un inhibidor, mientras que cada nexo está protegido por dos torretas.'
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: function() {
          return (this.currentPageNumber - 1) * 100 * -1;
        },
        list: [
          {title: 'TORRETAS', description: 'Las torretas infligen daño verdadero a los súbditos y campeones enemigos y proveen visión limitada dentro de la niebla de guerra para su equipo. Ataca estas estructuras al tener súbditos por delante de ti para evitar daño y seguir adelante.'},
          {title: 'INHIBIDORES', description: 'Cada inhibidor está protegido por una torreta. Al destruirlos, aparecerán supersúbditos en ese carril durante varios minutos. Posteriormente, el inhibidor reaparecerá y los supersúbditos dejarán de aparecer.'}
        ],
      }
    },
    {
      header: {
        subtitle: 'Monstruos Neutrales',
        title: 'Domina la jungla',
        descriptions: [
          'Entre los carriles se encuentra la jungla, en donde residen monstruos neutrales y plantas de la jungla. Los dos monstruos más importantes son Barón Nashor y los Dragones. Asesinar a estas unidades otorga mejoras únicas para tu equipo y también puede inclinar la balanza de la partida.'
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: function() {
          return (this.currentPageNumber - 1) * 100 * -1;
        },
        list: [
          {title: 'BARÓN NASHOR', description: 'El Barón Nashor es el monstruo más poderoso en la jungla. Asesinar al Barón le otorga al equipo que lo asesinó daño de ataque y poder de habilidad adicionales, una retirada potenciada y aumenta en gran medida el poder de los súbditos cercanos.'},
          {title: 'DRAGONES', description: 'Los dragones son monstruos poderosos que otorgan efectos adicionales únicos dependiendo del elemento del dragón que tu equipo asesine. Existen cuatro dragones elementales y un Dragón Ancestral.'},
        ],
      }
    },
    {
      header: {
        subtitle: 'Posiciones de carril',
        title: 'Elige tu carril',
        descriptions: [
          'Hay cinco posiciones en la composición de equipo recomendada para una partida. Cada carril se presta más para el uso de cierto tipo de campeones y roles, pruébalos todos o juega en tu carril favorito.'
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: function() {
          return (this.currentPageNumber - 1) * 100 * -1;
        },
        list: [
          {title: 'CARRIL SUPERIOR', description: 'Los campeones del carril superior son los fuertes luchadores en solitario del equipo. Su trabajo es proteger su carril y enfocarse en los miembros más poderosos del equipo enemigo.'},
          {title: 'JUNGLA', description: 'Los jungleros viven para la caza. Acechan entre carriles con sigilo y habilidad, mantienen vigilados a los monstruos neutrales más importantes y atacan en cuanto un oponente baja la guardia.'},
          {title: 'CARRIL CENTRAL', description: 'Los campeones del carril central tienen un alto daño súbito y pueden hacer de todo, tanto solos como en equipo. Para ellos, el combate es una peligrosa danza en la que siempre están buscando una oportunidad para superar a su oponente.'},
          {title: 'CARRIL INFERIOR', description: 'Los campeones del carril inferior son la dinamita del equipo. Al igual que un cargamento muy valioso, necesitan ser protegidos durante el juego temprano antes de obtener mucho oro y experiencia para llevar al equipo a la victoria.'},
          {title: 'SOPORTE', description: 'Los campeones de soporte son los guardianes del equipo. Ayudan a mantener vivos a los miembros del equipo y a preparar el camino para los asesinatos, protegiendo a su compañero en el carril inferior hasta que se vuelve más fuerte.'},
        ],
      }
    },
  ];

  powersInfo: any = [
    {
      videoPosition: 0,
      isShown: true,
      videoPath: 'assets/images/get-exp.webm',
      title: 'OBTENER EXPERIENCIA',
      description: 'Cuando los campeones obtienen cierta cantidad de experiencia, suben de nivel y pueden desbloquear o fortalecer habilidades y aumentar sus estadísticas básicas. Obtén experiencia al matar unidades y campeones enemigos, asistir en un asesinato y destruir estructuras defensivas.',
    },
    {
      videoPosition: 1,
      isShown: false,
      videoPath: 'assets/images/get-gold.webm',
      title: 'OBTENER ORO',
      description: 'El oro es la moneda del juego con la que puedes comprar objetos para tu campeón. Obtén oro al matar unidades y campeones enemigos, asistir en un asesinato, destruir estructuras defensivas y equipar objetos que acumulan oro.',
    },
    {
      videoPosition: 2,
      isShown: false,
      videoPath: 'assets/images/shop.jpg',
      title: 'TIENDA',
      description: 'La tienda es el lugar en el que puedes comprar y vender objetos con el oro que obtengas. Solo se puede acceder a ella cuando estás en la base.',
    },

  ];


  constructor() {
  }

  ngOnInit(): void {
    this.videoPath = `assets/videos/${this.videoPaths[this.randomNumber()]}.mp4`;

  }

  ngAfterViewInit(): void {
    this.playToVideo();
    setTimeout(() => {
      this.scollInY = this.rules.nativeElement.getBoundingClientRect().top;
    });

  }

  playToVideo(): void {
    this.rulesVideo.nativeElement.muted = true;
    this.getExp.nativeElement.muted = true;
    this.getGold.nativeElement.muted = true;
    this.rulesVideo.nativeElement.play();
    this.getExp.nativeElement.play();
    this.getGold.nativeElement.play();
  }
  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths.length);
  };

  scrollToRules(): void {
    window.scrollTo({
      top: this.scollInY,
      behavior: 'smooth'
    });
  };

  changeItemList(subtitle: string, action: string, currentPageNumber: number): void {
    let index = this.rulesInfo.findIndex((rule) => rule.header.subtitle === subtitle);
    if(action === 'prev') {
      if(currentPageNumber <= 1) {
        this.rulesInfo[index].card.currentPageNumber = 1;
      } else {
        this.rulesInfo[index].card.currentPageNumber--;
      }
    } else {
      if(currentPageNumber >= this.rulesInfo[index].card.list.length) {
        this.rulesInfo[index].card.currentPageNumber = this.rulesInfo[index].card.list.length;
      } else {
        this.rulesInfo[index].card.currentPageNumber++;
      }
    }
  };

  showSelectedPower(title: string, videoPosition: number): void {
    this.videoPowerPostion = videoPosition;
    let index = this.powersInfo.findIndex((power: any) => power.title === title);
    this.hidePowers();
    this.powersInfo[index].isShown = true;
    this.videoPowerPath = this.powersInfo[index].videoPath;
  }

  hidePowers(): void {
    this.powersInfo.forEach((power: any) => {
      power.isShown = false;
    });
  };

  translateX(): number {
    return this.videoPowerPostion * 100 * -1;
  }

}
