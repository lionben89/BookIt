import { Action } from '@ngrx/store';
import { Category, ExtendedUserInfo, UserUpdateType, Location, Book } from '../../data_types/states.model';

export const ActionsExploreConsts={
        ADD_USER_NEARBY:"ADD_USER_NEARBY",
        REMOVE_USER_NEARBY:"REMOVE_USER_NEARBY",
        DELETE_ALL_USERS_NEARBY:"DELETE_ALL_USERS_NEARBY",
        LOAD_BOOKS_FROM_USERS_NEAR_BY:"LOAD_BOOKS_FROM_USERS_NEAR_BY",
        LOAD_BOOKS_FROM_USERS_NEAR_BY_SUCCESS:"LOAD_BOOKS_FROM_USERS_NEAR_BY_SUCCESS",
        LOAD_BOOKS_FROM_USERS_NEAR_BY_FAIL:"LOAD_BOOKS_FROM_USERS_NEAR_BY_FAIL",
};

export class AddUserNearby implements Action {
    readonly type=ActionsExploreConsts.ADD_USER_NEARBY;
    constructor(public payload?:any){}
}

export class RemoveUserNearby implements Action {
    readonly type=ActionsExploreConsts.REMOVE_USER_NEARBY;
    constructor(public payload?:any){}
}

export class LoadBooksFromUsersNearBy implements Action{
    readonly type=ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY;
    constructor(public payload?:any){}
}

export class LoadBooksFromUsersNearBySuccess implements Action{
    readonly type=ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY_SUCCESS;
    constructor(public payload?:any){}
}

export class LoadBooksFromUsersNearByFail implements Action{
    readonly type=ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY_FAIL;
    constructor(public payload?:any){}
}

export class DeleteAllUsersNearBy implements Action{
    readonly type=ActionsExploreConsts.DELETE_ALL_USERS_NEARBY;
    constructor(public payload?:any){}
}


export type ExploreActions = AddUserNearby | RemoveUserNearby |
    LoadBooksFromUsersNearBy | LoadBooksFromUsersNearBySuccess | LoadBooksFromUsersNearByFail
    |DeleteAllUsersNearBy;

