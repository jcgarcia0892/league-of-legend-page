    export interface Champion {
        allytips: string[];
        blurb: string;
        enemytips: string[];
        id: string;
        image: ChampionImg;
        imgLoading: string;
        imgSplash: string;
        imgSquare: string;
        info: ChampionInfo;
        key: string;
        lore: string;
        name: string;
        partype: string;
        passive: ChampionPassive;
        recommended: string[]
        rolArray: string[];
        skillSelected: Skill;
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

    export interface ChampionInfo {
        attack: number;
        defense: number;
        difficulty: number;
        magic: number;
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