
import {Action} from '@ngrx/store';
import * as fromContext from '../actions/context.action';
import {ContextState} from '../../data_types/states.model'


let initState:ContextState={
    navbar:{
        optionEnabled:"explorer"
    }
};
export function contextReducer(state:ContextState=initState,action:fromContext.ContextActions){
    

    switch (action.type){
        case fromContext.ActionsConsts.CHOOSE_EXPLORER:{
            return {...state,navbar:{...state.navbar,optionEnabled:"explorer"}};
        }
        case fromContext.ActionsConsts.CHOOSE_MY_BOOKS:{
            return {...state,navbar:{...state.navbar,optionEnabled:"my books"}};
        }
        case fromContext.ActionsConsts.CHOOSE_SETTINGS:{
            return {...state,navbar:{...state.navbar,optionEnabled:"settings"}};
        }
        default: return state;
    }
}

export const getContetxtNavbarOptionEnabled=(state:ContextState)=>{return state.navbar.optionEnabled;}
export const getContextNavbar=(state:ContextState)=>{return state.navbar;}