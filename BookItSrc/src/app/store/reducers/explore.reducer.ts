
import { Action } from '@ngrx/store';
import * as fromContext from '../actions/context.action';
import * as fromUserData from '../actions/userData.action';
import * as fromExplore from '../actions/explore.action';
import { ExploreState, Book } from '../../data_types/states.model'

export const isBookEquale = (book1, book2) => {
    let eq = true;
    let keys = Object.keys(book1);
    for (let key of keys) {
        if (book1[key] !== book2[key]) {
            eq = false;
            break;
        }
    }
    return eq;
}
let initState: ExploreState = {
    usersNearBy: [],
    booksNearBy: [],
    loading: false,
    loaded: false,
};
export function ExploreReducer(state: ExploreState = initState, action: fromExplore.ExploreActions) {
    switch (action.type) {
        case fromExplore.ActionsExploreConsts.ADD_USER_NEARBY: {
            let userID = action.payload;
            let newUsersNearBy = state.usersNearBy.slice();
            if (newUsersNearBy.indexOf(userID) === -1) {
                newUsersNearBy.push(userID);
            }
            return { ...state, usersNearBy: newUsersNearBy };
        }

        case fromExplore.ActionsExploreConsts.REMOVE_USER_NEARBY: {
            let userID = action.payload;
            let userIndex = state.usersNearBy.indexOf(userID);
            if (userIndex > -1) {
                state.usersNearBy.splice(userIndex, 1);
            }
            return state;
        }

        case fromExplore.ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }

        case fromExplore.ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY_SUCCESS: {

            //console.log(action.payload);

            return {
                ...state,
                booksNearBy: action.payload,
                loading: false,
                loaded: true
            };
        }
        case fromExplore.ActionsExploreConsts.DELETE_ALL_USERS_NEARBY: {
            return { ...state, usersNearBy: new Array<any>() };
        }

        default: return state;
    }
}


export const getUsersNearBy = (state: ExploreState) => { return state.usersNearBy; }
export const getBooksNearBy = (state: ExploreState) => {
    let booksNearBy = [];
    if (state.booksNearBy) {
        state.booksNearBy.forEach((book: Book) => {
            if (!book.currentRequest.approved && !book.currentRequest.pending) {
                booksNearBy.push(book);
            }
        })
    }
    return booksNearBy;
}
export const getExploreStatus = (state: ExploreState) => { return { loading: state.loading, loaded: state.loaded } }

