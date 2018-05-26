
import { Action } from '@ngrx/store';
import * as fromContext from '../actions/context.action';
import * as fromUserData from '../actions/userData.action';
import * as fromExplore from '../actions/explore.action';
import { ExploreState } from '../../data_types/states.model'


let initState: ExploreState = {
    usersNearBy: [],
    loading: false,
    loaded: false,
};
export function ExploreReducer(state: ExploreState = initState, action: fromExplore.ExploreActions) {


    switch (action.type) {
        case fromExplore.ActionsExploreConsts.LOAD_USERS_NEAR_BY: {
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        }

        case fromExplore.ActionsExploreConsts.LOAD_USERS_NEAR_BY_SUCCESS: {
            return {
                usersNearBy: action.payload,
                loading: true,
                loaded: false
            }
        }

        default: return state;
    }
}


export const getUsersNearBy = (state: ExploreState) => { return state.usersNearBy; }

