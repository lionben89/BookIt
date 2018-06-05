import { Action } from '@ngrx/store';
import { Category, ExtendedUserInfo, UserUpdateType, Location, Book } from '../../data_types/states.model';

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
        ADD_LOCATION:"ADD_LOCATION", //add new location to DB
        ADD_LOCATION_SUCCESS:"ADD_LOCATION_SUCCESS", //location added to db
        LOAD_LOCATIONS:"LOAD_LOCATIONS", //load all locations from DB
        LOAD_LOCATIONS_SUCCESS:"LOAD_LOCATIONS_SUCCESS", //locations loaded 
        UPDATE_LOCATION:"UPDATE_LOCATION", // update location in DB
        UPDATE_LOCATION_SUCCESS:"UPDATE_LOCATION_SUCCESS", //updated location in DB
        REMOVE_LOCATION:"REMOVE_LOCATION", //remove location from DB
        REMOVE_LOCATION_SUCCESS:"REMOVE_LOCATION_SUCCESS", //removed location from DB
        LOGIN:"LOGIN", //get Auth data 
        LOGIN_SUCCESS:"LOGIN_SUCCESS", //push user data from Auth to DB
        LOGOUT:"LOGOUT", //log out from Auth
        ERROR:"ERROR",
        ADD_BOOK:"ADD_BOOK",
        ADD_BOOK_FAIL:"ADD_BOOK_FAIL",
        ADD_BOOK_SUCCESS:"ADD_BOOK_SUCCESS",
        UPDATE_BOOK:"UPDATE_BOOK",
        UPDATE_BOOK_FAIL:"UPDATE_BOOK_FAIL",
        UPDATE_BOOK_SUCCESS:"UPDATE_BOOK_SUCCESS",
        REMOVE_BOOK:"REMOVE_BOOK",
        REMOVE_BOOK_FAIL:"REMOVE_BOOK_FAIL",
        REMOVE_BOOK_SUCCESS:"REMOVE_BOOK_SUCCESS",
        LOAD_MY_BOOKS:"LOAD_MY_BOOKS",
        LOAD_MY_BOOKS_SUCCESS:"LOAD_MY_BOOKS_SUCCESS",
        LOAD_MY_BOOKS_FAIL:"LOAD_MY_BOOKS_FAIL",
        LOAD_MY_REQUESTS:"LOAD_MY_REQUESTS",
        LOAD_MY_REQUESTS_SUCCESS:"LOAD_MY_REQUESTS_SUCCESS",
        LOAD_MY_REQUESTS_FAIL:"LOAD_MY_REQUESTS_FAIL",
        REQUEST_BOOK:"REQUEST_BOOK",
        REQUEST_BOOK_SUCCESS:"REQUEST_BOOK_SUCCESS",
        REQUEST_BOOK_FAIL:"REQUEST_BOOK_FAIL",

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
    constructor(public payload?:Location){}
}

export class LoadLocations implements Action{
    readonly type=ActionsUserDataConsts.LOAD_LOCATIONS;
    constructor(public payload?:any){}
}

export class LoadLocationsSuccess implements Action{
    readonly type=ActionsUserDataConsts.LOAD_LOCATIONS_SUCCESS;
    constructor(public payload?:any){}
}

export class UpdateLocation implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_LOCATION;
    constructor(public payload?:Location){}
}

export class UpdateLocationSuccess implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_LOCATION_SUCCESS;
    constructor(public payload?:Location){}
}

export class RemoveLocation implements Action{
    readonly type=ActionsUserDataConsts.REMOVE_LOCATION;
    constructor(public payload?:Location){}
}

export class RemoveLocationSuccess implements Action{
    readonly type=ActionsUserDataConsts.REMOVE_LOCATION_SUCCESS;
    constructor(public payload?:Location){}
}

export class LoadMyBooks implements Action{
    readonly type=ActionsUserDataConsts.LOAD_MY_BOOKS;
    constructor(public payload?:any){}
}
export class LoadMyBooksSuccess implements Action{
    readonly type=ActionsUserDataConsts.LOAD_MY_BOOKS_SUCCESS;
    constructor(public payload?:any){}
}
export class LoadMyBooksFail implements Action{
    readonly type=ActionsUserDataConsts.LOAD_MY_BOOKS_FAIL;
    constructor(public payload?:any){}
}
export class AddBook implements Action{
    readonly type=ActionsUserDataConsts.ADD_BOOK;
    constructor(public payload?:Book){}
}
export class AddBookSuccess implements Action{
    readonly type=ActionsUserDataConsts.ADD_BOOK_SUCCESS;
    constructor(public payload?:any){}
}
export class AddBookFail implements Action{
    readonly type=ActionsUserDataConsts.ADD_BOOK_FAIL;
    constructor(public payload?:any){}
}
export class UpdateBook implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_BOOK;
    constructor(public payload?:Book){}
}
export class UpdateBookSuccess implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_BOOK_SUCCESS;
    constructor(public payload?:any){}
}
export class UpdateBookFail implements Action{
    readonly type=ActionsUserDataConsts.UPDATE_BOOK_FAIL;
    constructor(public payload?:any){}
}

export class RemoveBook implements Action{
    readonly type=ActionsUserDataConsts.REMOVE_BOOK;
    constructor(public payload?:any){}
}

export class RemoveBookSuccess implements Action{
    readonly type=ActionsUserDataConsts.REMOVE_BOOK_SUCCESS;
    constructor(public payload?:any){}
}

export class RemoveBookFail implements Action{
    readonly type=ActionsUserDataConsts.REMOVE_BOOK_FAIL;
    constructor(public payload?:any){}
}

export class LoadMyRequests implements Action{
    readonly type=ActionsUserDataConsts.LOAD_MY_REQUESTS;
    constructor(public payload?:any){}
}
export class LoadMyRequestsSuccess implements Action{
    readonly type=ActionsUserDataConsts.LOAD_MY_REQUESTS_SUCCESS;
    constructor(public payload?:any){}
}
export class LoadMyRequestsFail implements Action{
    readonly type=ActionsUserDataConsts.LOAD_MY_REQUESTS_FAIL;
    constructor(public payload?:any){}
}
export class RequestBook implements Action{
    readonly type=ActionsUserDataConsts.REQUEST_BOOK;
    constructor(public payload?:any){}
}

export class RequestBookSuccess implements Action{
    readonly type=ActionsUserDataConsts.REQUEST_BOOK_SUCCESS;
    constructor(public payload?:any){}
}

export class RequestBookFail implements Action{
    readonly type=ActionsUserDataConsts.REQUEST_BOOK_FAIL;
    constructor(public payload?:any){}
}

export type UserDataActions =// LoadFavoriteCategories | LoadFavoriteCategoriesFail | LoadFavoriteCategoriesSuccess|
LoadUserInfo | LoadUserInfoFail | LoadUserInfoSuccess |
LoginGoogle | LoginFacebook | Logout | ErrorHandler | LoginSuccess |
UpdateUserInfo|UpdateUserInfoFail |
AddLocation | AddLocationSuccess |
LoadLocations | LoadLocationsSuccess | 
UpdateLocation | UpdateLocationSuccess |
RemoveLocation | RemoveLocationSuccess |
AddBook|AddBookSuccess|AddBookFail|LoadMyBooks|LoadMyBooksSuccess|LoadMyBooksFail
|UpdateBook|UpdateBookSuccess|UpdateBookFail
|RemoveBook|RemoveBookSuccess|RemoveBookFail
|RequestBook|RequestBookFail|RequestBookSuccess
|LoadMyRequests|LoadMyRequestsFail|LoadMyRequestsSuccess;