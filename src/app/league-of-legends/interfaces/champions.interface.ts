export interface ChampionsObject {
  type: string;
  format: string;
  version: string;
  data: Data;
}

interface Data {
  Aatrox: Champion;
  Ahri: Champion;
  Akali: Champion;
  Akshan: Champion;
  Alistar: Champion;
  Amumu: Champion;
  Anivia: Champion;
  Annie: Champion;
  Aphelios: Champion;
  Ashe: Champion;
  AurelionSol: Champion;
  Azir: Champion;
  Bard: Champion;
  Blitzcrank: Champion;
  Brand: Champion;
  Braum: Champion;
  Caitlyn: Champion;
  Camille: Champion;
  Cassiopeia: Champion;
  Chogath: Champion;
  Corki: Champion;
  Darius: Champion;
  Diana: Champion;
  Draven: Champion;
  DrMundo: Champion;
  Ekko: Champion;
  Elise: Champion;
  Evelynn: Champion;
  Ezreal: Champion;
  Fiddlesticks: Champion;
  Fiora: Champion;
  Fizz: Champion;
  Galio: Champion;
  Gangplank: Champion;
  Garen: Champion;
  Gnar: Champion;
  Gragas: Champion;
  Graves: Champion;
  Gwen: Champion;
  Hecarim: Champion;
  Heimerdinger: Champion;
  Illaoi: Champion;
  Irelia: Champion;
  Ivern: Champion;
  Janna: Champion;
  JarvanIV: Champion;
  Jax: Champion;
  Jayce: Champion;
  Jhin: Champion;
  Jinx: Champion;
  Kaisa: Champion;
  Kalista: Champion;
  Karma: Champion;
  Karthus: Champion;
  Kassadin: Champion;
  Katarina: Champion;
  Kayle: Champion;
  Kayn: Champion;
  Kennen: Champion;
  Khazix: Champion;
  Kindred: Champion;
  Kled: Champion;
  KogMaw: Champion;
  Leblanc: Champion;
  LeeSin: Champion;
  Leona: Champion;
  Lillia: Champion;
  Lissandra: Champion;
  Lucian: Champion;
  Lulu: Champion;
  Lux: Champion;
  Malphite: Champion;
  Malzahar: Champion;
  Maokai: Champion;
  MasterYi: Champion;
  MissFortune: Champion;
  MonkeyKing: Champion;
  Mordekaiser: Champion;
  Morgana: Champion;
  Nami: Champion;
  Nasus: Champion;
  Nautilus: Champion;
  Neeko: Champion;
  Nidalee: Champion;
  Nocturne: Champion;
  Nunu: Champion;
  Olaf: Champion;
  Orianna: Champion;
  Ornn: Champion;
  Pantheon: Champion;
  Poppy: Champion;
  Pyke: Champion;
  Qiyana: Champion;
  Quinn: Champion;
  Rakan: Champion;
  Rammus: Champion;
  RekSai: Champion;
  Rell: Champion;
  Renekton: Champion;
  Rengar: Champion;
  Riven: Champion;
  Rumble: Champion;
  Ryze: Champion;
  Samira: Champion;
  Sejuani: Champion;
  Senna: Champion;
  Seraphine: Champion;
  Sett: Champion;
  Shaco: Champion;
  Shen: Champion;
  Shyvana: Champion;
  Singed: Champion;
  Sion: Champion;
  Sivir: Champion;
  Skarner: Champion;
  Sona: Champion;
  Soraka: Champion;
  Swain: Champion;
  Sylas: Champion;
  Syndra: Champion;
  TahmKench: Champion;
  Taliyah: Champion;
  Talon: Champion;
  Taric: Champion;
  Teemo: Champion;
  Thresh: Champion;
  Tristana: Champion;
  Trundle: Champion;
  Tryndamere: Champion;
  TwistedFate: Champion;
  Twitch: Champion;
  Udyr: Champion;
  Urgot: Champion;
  Varus: Champion;
  Vayne: Champion;
  Veigar: Champion;
  Velkoz: Champion;
  Vex: Champion;
  Vi: Champion;
  Viego: Champion;
  Viktor: Champion;
  Vladimir: Champion;
  Volibear: Champion;
  Warwick: Champion;
  Xayah: Champion;
  Xerath: Champion;
  XinZhao: Champion;
  Yasuo: Champion;
  Yone: Champion;
  Yorick: Champion;
  Yuumi: Champion;
  Zac: Champion;
  Zed: Champion;
  Ziggs: Champion;
  Zilean: Champion;
  Zoe: Champion;
  Zyra: Champion;
}

interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: Info;
  image: Image;
  tags: string[];
  partype: string;
  stats: Stats;
}

interface Stats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}