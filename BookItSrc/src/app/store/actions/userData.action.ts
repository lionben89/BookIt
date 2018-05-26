import { Action } from '@ngrx/store';
import { Category, ExtendedUserInfo, UserUpdateType } from '../../data_types/states.model';
import {location } from "../../main/sub-main/settings/settings.component"

export const ActionsUserDataConsts={

        //LOAD_FAVORITE_CATEGORIES:"LOAD_FAVORITE_CATEGORIES",
        //LOAD_FAVORITE_CATEGORIES_SUCCESS:"LOAD_FAVORITE_CATEGORIES_SUCCESS",
        //LOAD_FAVORITE_CATEGORIES_FAIL:"LOAD_FAVORITE_CATEGORIES_FAIL",
        //ADD_FAVORITE_CATEGORY:"ADD_FAVORITE_CATEGORY",
        //ADD_FAVORITE_CATEGORY_SUCCESS:"ADD_FAVORITE_CATEGORY_SUCSESS",
        //REMOVE_FAVORITE_CATEGORY:"REMOVE_FAVORITE_CATEGORY",
        //REMOVE_FAVORITE_CATEGORY_SUCCESS:"REMOVE_FAVORITE_CATEGORY_SUCCESS",
        //REMOVE_FAVORITE_CATEGORY_FAIL:"REMOVE_FAVORITE_CATEGORY_FAIL",
        UPDATE_USER_INFO:"UPDATE_USER_INFO",
        UPDATE_USER_INFO_FAIL:"UPDATE_USER_INDO_FAIL",
        LOAD_USER_INFO:"LOAD_USER_INFO", //get user data from DB
        LOAD_USER_INFO_SUCCESS:"LOAD_USER_INFO_SUCCESS",//put user data in store
        LOAD_USER_INFO_FAIL:"LOAD_USER_INFO_FAIL",//user data from DB failed
        LOGIN_GOOGLE:"LOGIN_GOOGLE", //get Auth data 
        LOGIN_FACEBOOK:"LOGIN_FACEBOOK", //get Auth data 
        LOGIN_SUCCESS:"LOGIN_SUCCESS", //push user data from Auth to DB
        LOGOUT:"LOGOUT", //log out from Auth
        ERROR:"ERROR",
        ADD_LOCATION:"ADD_LOCATION",
        ADD_LOCATION_SUCCESS:"ADD_LOCATION_SUCCESS"

}; 

export class LoginGoogle implements Action{
    readonly type=ActionsUserDataConsts.LOGIN_GOOGLE;
    constructor(public payload?:any){}
}

export class LoginFacebook implements Action{
    readonly type=ActionsUserDataConsts.LOGIN_FACEBOOK;
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

export class UpdateUserInfo implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_USER_INFO;
    constructor(public updateType:UserUpdateType, public payload?:any){}
}

export class UpdateUserInfoFail implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_USER_INFO_FAIL;
    constructor(public payload?:any){}
}

export class AddLocation implements Action{
    readonly type=ActionsUserDataConsts.ADD_LOCATION;
    constructor(public payload?:Location){}
}

export class AddLocationSuccess implements Action{
    readonly type=ActionsUserDataConsts.ADD_LOCATION_SUCCESS;
    constructor(public payload?:any){}
}

export type UserDataActions =// LoadFavoriteCategories | LoadFavoriteCategoriesFail | LoadFavoriteCategoriesSuccess|
LoadUserInfo | LoadUserInfoFail | LoadUserInfoSuccess
|LoginGoogle|LoginFacebook |Logout| ErrorHandler| LoginSuccess|
UpdateUserInfo|UpdateUserInfoFail |
AddLocation | AddLocationSuccess;
