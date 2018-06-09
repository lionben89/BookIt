
import { Action } from '@ngrx/store';

export const ActionsConsts={

        CHOOSE_EXPLORER:"CHOOSE_EXPLORER",
        CHOOSE_SETTINGS:"CHOOSE_SETTINGS",
        CHOOSE_MY_BOOKS:"CHOOSE_MY_BOOKS",
        CHOOSE_MY_REQUESTS:"CHOOSE_MY_REQUESTS",
        CHOOSE_MY_REQUESTS_CHAT:"CHOOSE_MY_REQUESTS_CHAT",
        CHOOSE_SETTINGS_LOCATIONS:"CHOOSE_SETTINGS_LOCATIONS",
        CHOOSE_SETTINGS_ADD_LOCATIONS:"CHOOSE_SETTINGS_ADD_LOCATIONS",
        CHOOSE_SETTINGS_CATEGORIES:"CHOOSE_SETTINGS_CATEGORIES",
        CHOOSE_MY_BOOKS_ADD_BOOK:"CHOOSE_MY_BOOKS_ADD_BOOK",
        CHOOSE_MY_BOOKS_MAIN:"CHOOSE_MY_BOOKS_MAIN",
        CHOOSE_MY_BOOKS_CHAT:"CHOOSE_MY_BOOKS_CHAT",
        
}; 


export class ChooseExplorer implements Action{
    readonly type =ActionsConsts.CHOOSE_EXPLORER;
}

export class ChooseSettings implements Action{
    readonly type:string;
    constructor(){
        this.type=ActionsConsts.CHOOSE_SETTINGS;
    }
}

export class ChooseMyBooks implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS;
}

export class ChooseMyRequests implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_REQUESTS;
}

export class ChooseMyRequestsChat implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_REQUESTS_CHAT;
}

export class ChooseMyBooksAddBook implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS_ADD_BOOK;
}
export class ChooseMyBooksMain implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS_MAIN;
}
export class ChooseMyBooksChat implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS_CHAT;
}
export class ChooseSettingsLocations implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_LOCATIONS;
}

export class ChooseSettingsAddLocations implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_ADD_LOCATIONS;
}

export class ChooseSettingsCategories implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_CATEGORIES;
}

export type ContextActions = ChooseExplorer | ChooseSettings| ChooseMyRequests
 | ChooseSettingsCategories | 
ChooseSettingsAddLocations | ChooseSettingsLocations|ChooseMyBooks| 
ChooseMyBooksAddBook | ChooseMyRequestsChat;
