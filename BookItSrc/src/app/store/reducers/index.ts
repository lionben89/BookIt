import { MainState } from './index';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContext from './context.reducer';
import { ContextState } from '../../data_types/states.model'

export interface MainState {
    context: ContextState
}

export const reducers: ActionReducerMap<MainState> = {
    context: fromContext.contextReducer,
};

//main state selector


//context selectors
export const getContextState = createFeatureSelector<ContextState>('context');

export const getContextNavbar=createSelector(getContextState,fromContext.getContextNavbar);
export const getContextNavbarOptionEnabled=createSelector(getContextState,fromContext.getContetxtNavbarOptionEnabled);
export const getContextSettingsOption=createSelector(getContextState,fromContext.getContextSettingsOption);