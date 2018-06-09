
import {Action} from '@ngrx/store';
import * as fromContext from '../actions/context.action';
import * as fromUserData from '../actions/userData.action';
import {ContextState} from '../../data_types/states.model'


let initState:ContextState={
    navbar:{
        optionEnabled:"explorer",
        settingsOption:"settings",
        myBooksOption:"my_books",
        myRequestsOption:"my_requests",
        show:true,
    }
};
export function contextReducer(state:ContextState=initState,action:fromContext.ContextActions){
    

    switch (action.type){
        case fromContext.ActionsConsts.CHOOSE_EXPLORER:{
            return {...state,
                    navbar:{ ...state.navbar,
                        show:true,
                        optionEnabled:"explorer",
                        myBooksOption:"my_books",
                        myRequestsOption:"my_requests",
                    }
                };
        }

        case fromContext.ActionsConsts.CHOOSE_MY_BOOKS:{
            return {...state,
                    navbar:{ ...state.navbar,
                        show:true,
                        optionEnabled:"my_books",
                        myBooksOption:"my_books",
                        myRequestsOption:"my_requests",
                        
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_MY_REQUESTS:{
            return {...state,
                    navbar:{ ...state.navbar,
                        show:true,
                        optionEnabled:"my_requests",
                        myBooksOption:"my_books",
                        myRequestsOption:"my_requests",
                        
                    }
                };
        }

        case fromContext.ActionsConsts.CHOOSE_MY_REQUESTS_CHAT:{
            return {...state,
                    navbar:{ ...state.navbar,
                        show:true,
                        optionEnabled:"my_requests",
                        myRequestsOption:"my_requests_chat",
                        
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_MY_REQUESTS:{
            return {...state,
                    navbar:{ ...state.navbar,
                        show:true,
                        optionEnabled:"my_requests",
                        
                    }
                };
        }

        case fromUserData.ActionsUserDataConsts.ADD_BOOK_SUCCESS:{
            return {...state,
                navbar:{ ...state.navbar,
                    show:true,
                    optionEnabled:"my_books",
                    myBooksOption:"my_books",
                }
            };
        }

        case fromContext.ActionsConsts.CHOOSE_MY_BOOKS_ADD_BOOK:{
            return {...state,
                    navbar:{ ...state.navbar,
                        show:false,
                        myBooksOption:"add_book"
                    }
                };
        }

        
        case fromContext.ActionsConsts.CHOOSE_MY_BOOKS_MAIN:{
            return {...state,
                    navbar:{...state.navbar,
                        show:true,
                        myBooksOption:"my_books"
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_MY_BOOKS_CHAT:{
            return {...state,
                    navbar:{...state.navbar,
                        show:true,
                        myBooksOption:"my_books_chat"
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_SETTINGS:{
            return {...state,
                    navbar:{...state.navbar,
                        show:true,
                        optionEnabled:"settings",
                        settingsOption:"settings",
                        myBooksOption:"my_books",
                        myRequestsOption:"my_requests",
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_SETTINGS_LOCATIONS:{
            return {...state,
                    navbar:{...state.navbar,
                        show:false,
                        settingsOption:"locations"
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_SETTINGS_ADD_LOCATIONS:{
            return {...state,
                    navbar:{...state.navbar,
                        show:false,
                        settingsOption:"add_locations"
                    }
                };
        }
        case fromContext.ActionsConsts.CHOOSE_SETTINGS_CATEGORIES:{
            return {...state,
                    navbar:{...state.navbar,
                        show:false,
                        settingsOption:"categories"
                    }
                };
        }
        default: return state;
    }
}

export const getContetxtNavbarOptionEnabled=(state:ContextState)=>{return state.navbar.optionEnabled;}
export const getContextNavbar=(state:ContextState)=>{return state.navbar;}
export const getContextSettingsOption=(state:ContextState)=>{return state.navbar.settingsOption;}
export const getContextmybooksOption=(state:ContextState)=>{return state.navbar.myBooksOption;}
export const getContextmyRequestsOption=(state:ContextState)=>{return state.navbar.myRequestsOption;}
