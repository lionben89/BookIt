import { Action } from '@ngrx/store';
import { Category, ExtendedUserInfo, UserUpdateType, Location, Book } from '../../data_types/states.model';

export const ActionsExploreConsts={

        LOAD_USERS_NEAR_BY:"LOAD_USERS_NEAR_BY",
        LOAD_USERS_NEAR_BY_SUCCESS:"LOAD_USERS_NEAR_BY_SUCCESS",
        LOAD_USERS_NEAR_BY_FAIL:"LOAD_USERS_NEAR_BY_FAIL",


}; 

export class LoadUsersNearBy implements Action{
    readonly type=ActionsExploreConsts.LOAD_USERS_NEAR_BY;
    constructor(public payload?:any){}
}

export class LoadUsersNearBySuccess implements Action{
    readonly type=ActionsExploreConsts.LOAD_USERS_NEAR_BY_SUCCESS;
    constructor(public payload?:any){}
}

export class LoadUsersNearByFail implements Action{
    readonly type=ActionsExploreConsts.LOAD_USERS_NEAR_BY_FAIL;
    constructor(public payload?:any){}
}


export type ExploreActions =LoadUsersNearBy|LoadUsersNearBySuccess|LoadUsersNearByFail;

