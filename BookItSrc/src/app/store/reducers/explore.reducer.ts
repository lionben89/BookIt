import { ActionsUserDataConsts } from './../actions/userData.action';

import { Action } from '@ngrx/store';
import * as fromContext from '../actions/context.action';
import * as fromUserData from '../actions/userData.action';
import * as fromExplore from '../actions/explore.action';
import { ExploreState, Book, Coordinates } from '../../data_types/states.model'

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
    usersNearBy: {},
    booksNearBy: {},
    chatUsersInfo:{},
    loading: false,
    loaded: false,
};
export function ExploreReducer(state: ExploreState = initState, action: fromExplore.ExploreActions) {
    switch (action.type) {
        case fromExplore.ActionsExploreConsts.ADD_USER_NEARBY: {
            let userId = action.payload.userID;
            let coordinates = action.payload.coordinates;

            let newUsersNearBy = {...state.usersNearBy};
            
            if (!(userId in newUsersNearBy)) {
                newUsersNearBy[userId] = Array<Coordinates>();
            }

            let locationIndex = newUsersNearBy[userId].findIndex(elem =>
                elem.lat === coordinates.lat && elem.long === coordinates.long);

            if (locationIndex === -1) {
                newUsersNearBy[userId].push(coordinates);
            }

            let newState = {...state, usersNearBy: newUsersNearBy, loading: false, loaded: true};
            return newState;
        }

        case fromExplore.ActionsExploreConsts.REMOVE_USER_NEARBY: {
            let userId = action.payload.userID;
            let coordinates = action.payload.coordinates;

            let newUsersNearBy = {...state.usersNearBy};
            
            if (!(userId in newUsersNearBy)) {
                return;
            }

            let locationIndex = newUsersNearBy[userId].findIndex(elem =>
                elem.lat === coordinates.lat && elem.long === coordinates.long);

            if (locationIndex !== -1) {
                newUsersNearBy[userId].splice(locationIndex, 1);
            }

            if (newUsersNearBy[userId].length === 0) {
                delete newUsersNearBy.usersNearBy[userId];

            }
            
            let newState = {...state, usersNearBy: newUsersNearBy, loading: false, loaded: true};
            return newState;
        }

        case fromExplore.ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }

        case fromExplore.ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY_SUCCESS: {
            let newState = {...state, loading: false, loaded: true};
            
            let userId = action.payload.userId;
            newState.booksNearBy[userId] = action.payload.books;
            return newState;
        }
        case fromExplore.ActionsExploreConsts.DELETE_ALL_USERS_NEARBY: {
            return { ...state, usersNearBy: {} };
        }
        case fromExplore.ActionsExploreConsts.LOAD_OTHER_USER_INFO_SUCCESS:{
            let newChatUsersInfo={...state.chatUsersInfo};
            newChatUsersInfo[action.payload.userId]=action.payload.info;
            return {...state,chatUsersInfo:newChatUsersInfo}
        }

        default: return state;
    }
}


export const getUsersNearBy = (state: ExploreState) => { return state.usersNearBy; }
export const getBooksNearBy = (state: ExploreState) => {
    let booksNearBy = new Array<Book>();
    if (state.booksNearBy) {
        Object.entries(state.booksNearBy).forEach(elem => {
            let userBooks = elem[1];
            userBooks.forEach((book: Book) => {
                if (!book.currentRequest.approved && !book.currentRequest.pending) {
                    booksNearBy.push(book);
                }
            });
        });
    }
    return booksNearBy;
}
export const getExploreStatus = (state: ExploreState) => { return { loading: state.loading, loaded: state.loaded } }
export const getOtherUserInfo =(state: ExploreState, userId:string) => { return state.chatUsersInfo[userId]; }
