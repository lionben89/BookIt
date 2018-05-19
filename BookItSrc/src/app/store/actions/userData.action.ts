import { Action } from '@ngrx/store';
import { Category, ExtendedUserInfo } from '../../data_types/states.model';

export const ActionsUserDataConsts={

        LOAD_FAVORITE_CATEGORIES:"LOAD_FAVORITE_CATEGORIES",
        LOAD_FAVORITE_CATEGORIES_SUCCESS:"LOAD_FAVORITE_CATEGORIES_SUCCESS",
        LOAD_FAVORITE_CATEGORIES_FAIL:"LOAD_FAVORITE_CATEGORIES_FAIL",
        ADD_FAVORITE_CATEGORY:"ADD_FAVORITE_CATEGORY",
        ADD_FAVORITE_CATEGORY_SUCCESS:"ADD_FAVORITE_CATEGORY_SUCSESS",
        REMOVE_FAVORITE_CATEGORY:"REMOVE_FAVORITE_CATEGORY",
        REMOVE_FAVORITE_CATEGORY_SUCCESS:"REMOVE_FAVORITE_CATEGORY_SUCCESS",
        REMOVE_FAVORITE_CATEGORY_FAIL:"REMOVE_FAVORITE_CATEGORY_FAIL",
        LOAD_USER_INFO:"LOAD_USER_INFO",
        LOAD_USER_INFO_SUCCESS:"LOAD_USER_INFO_SUCCESS",//authenticated
        LOAD_USER_INFO_FAIL:"LOAD_USER_INFO_FAIL",//not authenticated
        LOGIN:"LOGIN",
        LOGIN_SUCCESS:"LOGIN_SUCCESS",
        LOGOUT:"LOGOUT",
        ERROR:"ERROR",

}; 

export class Login implements Action{
    readonly type=ActionsUserDataConsts.LOGIN;
    constructor(public payload?:any){}
}

export class LoginSuccess implements Action{
    readonly type=ActionsUserDataConsts.LOGIN_SUCCESS;
    constructor(public payload?:ExtendedUserInfo){}
}

export class Logout implements Action{
    readonly type=ActionsUserDataConsts.LOGOUT;
    constructor(public payload?:any){}
}

export class ErrorHandler implements Action{
    readonly type=ActionsUserDataConsts.ERROR;
    constructor(public payload?:any){}
}
export class LoadFavoriteCategories implements Action{
    readonly type =ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES;
    constructor(public payload?:any){}
}

export class LoadFavoriteCategoriesSuccess implements Action{
    readonly type =ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES_SUCCESS;
    constructor(public payload:Category[]){}
}

export class LoadFavoriteCategoriesFail implements Action{
    readonly type =ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES_FAIL;
    constructor(public payload:any){}
}

export class LoadUserInfo implements Action{
    readonly type =ActionsUserDataConsts.LOAD_USER_INFO;
    constructor(public payload?:any){}
}

export class LoadUserInfoSuccess implements Action{
    readonly type =ActionsUserDataConsts.LOAD_USER_INFO_SUCCESS;
    constructor(public payload:any){}
}

export class LoadUserInfoFail implements Action{
    readonly type =ActionsUserDataConsts.LOAD_USER_INFO_FAIL;
    constructor(public payload?:any){}
}

export type UserDataActions = LoadFavoriteCategories | LoadFavoriteCategoriesFail | LoadFavoriteCategoriesSuccess
|LoadUserInfo | LoadUserInfoFail | LoadUserInfoSuccess
|Login |Logout| ErrorHandler| LoginSuccess;