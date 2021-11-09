export interface RulesInfo {
    header: Header;
    card:   Card;
}

export interface Card {
    currentPageNumber: number;
    translate:         number;
    list:              List[];
}

export interface List {
    title:       string;
    description: string;
}

export interface Header {
    subtitle:     string;
    title:        string;
    descriptions: string[];
}