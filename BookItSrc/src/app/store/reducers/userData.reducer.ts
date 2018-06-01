import { Category, UserSettingsState } from './../../data_types/states.model';

import { Action } from '@ngrx/store';
import * as fromUserData from '../actions/userData.action';
import { UserState } from '../../data_types/states.model'

let initState: UserState = {
    userSettings: {
        info: {
            uid: '',
            displayName: '',
            email: '',
            photoURL: '',
            accountDeleted: false,
            borrowRestricted: false,
            maxAllowedOpenBorrows: 0,
            shareMyBooks: true,
            loading: false,
            loaded: false,
        },
        locationSettings: {
            useCurrentLocation: true,
            searchRadiusKm: 3,
            loading: false,
            loaded: false,
        },
        favoriteCategories: {
            categories: [],
            loading: false,
            loaded: false,
        },

    },
    locations: {},
    myBooks: [],
    loading:false,
    loaded:false,
    
};
export function userDataReducer(state: UserState = initState, action: fromUserData.UserDataActions) {

    switch (action.type) {
        case fromUserData.ActionsUserDataConsts.LOGIN_GOOGLE: {
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    info: {
                        ...state.userSettings.info,
                        loading: true,
                        loaded: false,
                    }
                }
            };
        }
        case fromUserData.ActionsUserDataConsts.LOGIN_FACEBOOK: {
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    info: {
                        ...state.userSettings.info,
                        loading: true,
                        loaded: false,
                    }
                }
            };
        }
        //case fromUserData.ActionsUserDataConsts.LOGIN_SUCCESS:{

        //}
        case fromUserData.ActionsUserDataConsts.ERROR: {
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    info: {
                        ...state.userSettings.info,
                        loading: false,
                        loaded: false,
                        error: action.payload
                    }
                }
            };
        }

        case fromUserData.ActionsUserDataConsts.LOAD_USER_INFO: {
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    loading: true,
                    loaded: false,
                }
            };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_USER_INFO_SUCCESS: {
            return {
                ...state,
                userSettings: {
                    ...action.payload,
                    loading: false,
                    loaded: true,
                }
            };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_USER_INFO_FAIL: {
            return {
                ...state,
                userSettings: {
                    loading: false,
                    loaded: false,
                }
            };
        }
        case fromUserData.ActionsUserDataConsts.ADD_LOCATION: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }
        case fromUserData.ActionsUserDataConsts.ADD_LOCATION_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
            };
        }
        case fromUserData.ActionsUserDataConsts.ADD_BOOK_SUCCESS: {
            return {
                ...state,
            }
        }
        case fromUserData.ActionsUserDataConsts.LOAD_MY_BOOKS: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromUserData.ActionsUserDataConsts.LOAD_MY_BOOKS_SUCCESS:{
            return {...state,
                myBooks: action.payload,
                loading:false,
                loaded:true,
            }
        }
        case fromUserData.ActionsUserDataConsts.LOAD_LOCATIONS: {
            return { ...state,
                    loading: true,
                    loaded: false,
                };
        }
        case fromUserData.ActionsUserDataConsts.LOAD_LOCATIONS_SUCCESS: {
            return { ...state,
                    locations: action.payload,
                    loading: false,
                    loaded: true,
                };
        }
        case fromUserData.ActionsUserDataConsts.UPDATE_LOCATION: {
            return { ...state,
                    loading: true,
                    loaded: false,
                };
        }
        default: return state;
    }
}

//selectors
//export const getContetxtNavbarOptionEnabled=(state:ContextState)=>{return state.navbar.optionEnabled;}
//export const getUserDataCategories = (state: UserDataState) => { return state.favoriteCategories; }
export const getUserData = (state: UserState) => { return state }
export const getUserSettings = (state: UserState) => { return state.userSettings }
export const getUserLocations = (state: UserState) => { return state.locations }
export const getUserBooks = (state: UserState) => { return state.myBooks}
export const getUserSearchRadius=(state:UserState)=>{
    if (state.userSettings && state.userSettings.locationSettings ){
        return state.userSettings.locationSettings.searchRadiusKm
    }
    return 0;
}
export const getUserDataStatus=(state:UserState)=>{return {loading:state.loading, loaded:state.loaded}}