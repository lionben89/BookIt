

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
        CHOOSE_SETTINGS_TUTORIAL:"CHOOSE_SETTINGS_TUTORIAL",
        CHOOSE_MY_BOOKS_ADD_BOOK:"CHOOSE_MY_BOOKS_ADD_BOOK",
        CHOOSE_MY_BOOKS_MAIN:"CHOOSE_MY_BOOKS_MAIN",
        CHOOSE_MY_BOOKS_CHAT:"CHOOSE_MY_BOOKS_CHAT",
        CHOOSE_CURRENT_CATEGORY:"CHOOSE_CURRENT_CATEGORY",        
}; 

export class ChooseCurrentCategory implements Action{
    readonly type=ActionsConsts.CHOOSE_CURRENT_CATEGORY;
    constructor(public payload?:any){}
}
export class ChooseExplorer implements Action{
    readonly type =ActionsConsts.CHOOSE_EXPLORER;
    constructor(public payload?:any){}
}

export class ChooseSettings implements Action{
    readonly type=ActionsConsts.CHOOSE_SETTINGS;
    constructor(public payload?:any){};
}

export class ChooseMyBooks implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS;
    constructor(public payload?:any){}
}

export class ChooseMyRequests implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_REQUESTS;
    constructor(public payload?:any){}
}

export class ChooseMyRequestsChat implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_REQUESTS_CHAT;
    constructor(public payload?:any){}
}

export class ChooseMyBooksAddBook implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS_ADD_BOOK;
    constructor(public payload?:any){}
}
export class ChooseMyBooksMain implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS_MAIN;
    constructor(public payload?:any){}
}
export class ChooseMyBooksChat implements Action{
    readonly type =ActionsConsts.CHOOSE_MY_BOOKS_CHAT;
    constructor(public payload?:any){}
}
export class ChooseSettingsLocations implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_LOCATIONS;
    constructor(public payload?:any){}
}

export class ChooseSettingsAddLocations implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_ADD_LOCATIONS;
    constructor(public payload?:any){}
}

export class ChooseSettingsCategories implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_CATEGORIES;
    constructor(public payload?:any){}
}

export class ChooseSettingsTutorial implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_TUTORIAL;
    constructor(public payload?:any){}
}

export type ContextActions = ChooseExplorer | ChooseSettings| ChooseMyRequests
 | ChooseSettingsCategories | ChooseSettingsTutorial |
ChooseSettingsAddLocations | ChooseSettingsLocations|ChooseMyBooks| 
ChooseMyBooksAddBook | ChooseMyRequestsChat
|ChooseCurrentCategory;
