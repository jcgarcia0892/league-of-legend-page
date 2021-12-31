    export interface Champion {
        allytips: string[];
        enemytips: string[];
        id: string;
        image: ChampionImg;
        imgLoading: string;
        imgSplash: string;
        imgSquare: string;
        key: string;
        lore: string;
        name: string;
        passive: ChampionPassive;
        rolArray: string[];
        skillSelected?: Skill;
        skills: Skill[];
        skins: Skin[];
        tags: string[];
        title: string;
    }

    export interface ChampionImg {
        full: string;
        group: string;
        h: number;
        sprite: string;
        w: number;
        x: number;
        y: number;
    }

    export interface ChampionPassive {
        description: string;
        image: ChampionImg;
        name: string;
    }

    export interface Skill {
        checked: boolean;
        name: string,
        description: string,
        img: string;
        key: string;
    }

    export interface Skin {
        id: string;
        num: number;
        name: string;
        chromas: boolean;
    }