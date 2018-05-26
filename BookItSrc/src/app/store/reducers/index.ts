import { MainState } from './index';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContext from './context.reducer';
import * as fromUserData from './userData.reducer';
import { ContextState, UserState } from '../../data_types/states.model'

export interface MainState {
    context: ContextState,
    userData:UserState,
}

export const reducers: ActionReducerMap<MainState> = {
    context: fromContext.contextReducer,
    userData:fromUserData.userDataReducer,
};

//main state selector


//context selectors
export const getContextState = createFeatureSelector<ContextState>('context');
export const getContextNavbar=createSelector(getContextState,fromContext.getContextNavbar);
export const getContextNavbarOptionEnabled=createSelector(getContextState,fromContext.getContetxtNavbarOptionEnabled);
export const getContextSettingsOption=createSelector(getContextState,fromContext.getContextSettingsOption);

//userData selectors
export const getUserDataState = createFeatureSelector<UserState>('userData');
//export const getUserDataCategoriesState=createSelector(getUserDataState,fromUserData.getUserDataCategories);
//export const getUserDataInfo=createSelector(getUserDataState,fromUserData.getUserDataInfo);

export const getUserData=createSelector(getUserDataState,fromUserData.getUserData);
export const getUserSettings=createSelector(getUserDataState,fromUserData.getUserSettings);
export const getUserLocations=createSelector(getUserDataState,fromUserData.getUserLocations);

export const getContextmybooksOption=createSelector(getContextState,fromContext.getContextmybooksOption);
