import { Category } from './../../data_types/states.model';

import { Action } from '@ngrx/store';
import * as fromUserData from '../actions/userData.action';
import { UserDataState } from '../../data_types/states.model'

let initState: UserDataState = {
    info: {
        uid: '',
        displayName: '',
        email: '',
        photoURL: '',
        accountDeleted: false,
        borrowRestricted: false,
        maxAllowedOpenBorrows: 0,
        loading: false,
        loaded: false,
    },
    locationSettings: {
        locations: [],
        useCurrentLocation: true,
        searchRadiusKm: 3,
        loading: false,
        loaded: false,
    },
    favoriteCategories: {
        categories: [],
        loading: false,
        loaded: false,
    }
};
export function userDataReducer(state: UserDataState = initState, action: fromUserData.UserDataActions) {

    switch (action.type) {


        case fromUserData.ActionsUserDataConsts.LOGIN: {
            return { ...state, info: { ...state.info, loading: true } };
        }
        //case fromUserData.ActionsUserDataConsts.LOGIN_SUCCESS:{

        //}
        case fromUserData.ActionsUserDataConsts.ERROR: {
            return { ...state, info: { ...state.info, loading: false, error: action.payload } }
        }
        case fromUserData.ActionsUserDataConsts.LOAD_USER_INFO: {
            return { ...state, loading: true };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_USER_INFO_SUCCESS: {
            return {...action.payload};
        }
        case fromUserData.ActionsUserDataConsts.LOAD_USER_INFO_FAIL: {
            return { ...state,  loading: false, loaded: false };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES: {
            return { ...state, favoriteCategories: { ...state.favoriteCategories, loading: true } };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES_SUCCESS: {
            return { ...state, favoriteCategories: { ...state.favoriteCategories, loading: false, loaded: true, data: action.payload } };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES_FAIL: {
            return { ...state, favoriteCategories: { ...state.favoriteCategories, loading: false, loaded: false } };
        }
        default: return state;
    }
}

//selectors
//export const getContetxtNavbarOptionEnabled=(state:ContextState)=>{return state.navbar.optionEnabled;}
export const getUserDataCategories = (state: UserDataState) => { return state.favoriteCategories; }
export const getUserDataInfo = (state: UserDataState) => { return state.info; }
export const getUserDataID = (state: UserDataState) => { return state.info.uid; }