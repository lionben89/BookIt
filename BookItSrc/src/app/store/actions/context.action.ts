import { Action } from '@ngrx/store';

export const ActionsConsts={

        CHOOSE_EXPLORER:"CHOOSE_EXPLORER",
        CHOOSE_SETTINGS:"CHOOSE_SETTINGS",
        CHOOSE_MY_BOOKS:"CHOOSE_MY_BOOKS",
        CHOOSE_SETTINGS_MAIN:"CHOOSE_SETTINGS_MAIN",
        CHOOSE_SETTINGS_LOCATIONS:"CHOOSE_SETTINGS_LOCATIONS",
        CHOOSE_SETTINGS_CATEGORIES:"CHOOSE_SETTINGS_CATEGORIES",
    
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

export class ChooseSettingsMain implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_MAIN;
}

export class ChooseSettingsLocations implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_LOCATIONS;
}

export class ChooseSettingsCategories implements Action{
    readonly type =ActionsConsts.CHOOSE_SETTINGS_CATEGORIES;
}

export type ContextActions = ChooseExplorer | ChooseSettings | ChooseMyBooks | ChooseSettingsCategories | ChooseSettingsLocations | ChooseSettingsMain;