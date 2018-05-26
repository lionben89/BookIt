import { Action } from '@ngrx/store';
import { Category, ExtendedUserInfo, UserUpdateType, Location, Book } from '../../data_types/states.model';

export const ActionsExploreConsts={
        ADD_USER_NEARBY:"ADD_USER_NEARBY",
        REMOVE_USER_NEARBY:"REMOVE_USER_NEARBY",
        LOAD_USERS_NEAR_BY:"LOAD_USERS_NEAR_BY",
        LOAD_USERS_NEAR_BY_SUCCESS:"LOAD_USERS_NEAR_BY_SUCCESS",
        LOAD_USERS_NEAR_BY_FAIL:"LOAD_USERS_NEAR_BY_FAIL",
};

export class AddUserNearby implements Action {
    readonly type=ActionsExploreConsts.ADD_USER_NEARBY;
    constructor(public payload?:any){}
}

export class RemoveUserNearby implements Action {
    readonly type=ActionsExploreConsts.REMOVE_USER_NEARBY;
    constructor(public payload?:any){}
}

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


export type ExploreActions = AddUserNearby | RemoveUserNearby |
    LoadUsersNearBy | LoadUsersNearBySuccess | LoadUsersNearByFail;

