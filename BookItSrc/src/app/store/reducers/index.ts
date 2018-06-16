import { MainState } from './index';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContext from './context.reducer';
import * as fromUserData from './userData.reducer';
import * as fromExplore from './explore.reducer';
import * as fromMessages from './messages.reducer';
import { ContextState, UserState,ExploreState, MessagesState } from '../../data_types/states.model'

export interface MainState {
    context: ContextState,
    userData:UserState,
    explore:ExploreState,
    messages:MessagesState,
}

export const reducers: ActionReducerMap<MainState> = {
    context: fromContext.contextReducer,
    userData:fromUserData.userDataReducer,
    explore:fromExplore.ExploreReducer,
    messages:fromMessages.UserMessagesReducer,
};

//main state selector


//context selectors
export const getContextState = createFeatureSelector<ContextState>('context');
export const getContextNavbar=createSelector(getContextState,fromContext.getContextNavbar);
export const getContextNavbarOptionEnabled=createSelector(getContextState,fromContext.getContetxtNavbarOptionEnabled);
export const getContextSettingsOption=createSelector(getContextState,fromContext.getContextSettingsOption);
export const getContextmybooksOption=createSelector(getContextState,fromContext.getContextmybooksOption);
export const getContextmyRequestsOption=createSelector(getContextState,fromContext.getContextmyRequestsOption);
export const getContextCurrentCategory=createSelector(getContextState,fromContext.getContextCurrentCategory);

//userData selectors
export const getUserDataState = createFeatureSelector<UserState>('userData');
export const getUserData=createSelector(getUserDataState,fromUserData.getUserData);
export const getUserSettings=createSelector(getUserDataState,fromUserData.getUserSettings);
export const getUserLocations=createSelector(getUserDataState,fromUserData.getUserLocations);
export const getUserBooks=createSelector(getUserDataState,fromUserData.getUserBooks);
export const getUserRequests=createSelector(getUserDataState,fromUserData.getUserRequests);
export const getUserSearchRadius=createSelector(getUserDataState,fromUserData.getUserSearchRadius);
export const getUserDataStatus=createSelector(getUserDataState,fromUserData.getUserDataStatus);
export const getUserInfo=createSelector(getUserDataState,fromUserData.getUserInfo);
export const getMessege=createSelector(getUserDataState,fromUserData.getMessege);
export const IsAllowToRequest=createSelector(getUserDataState,fromUserData.IsAllowToRequest);

//Explore selectors
export const getExploreState = createFeatureSelector<ExploreState>('explore');
export const getUsersNearBy=createSelector(getExploreState,fromExplore.getUsersNearBy);
export const getBooksNearBy=createSelector(getExploreState,fromExplore.getBooksNearBy);
export const getExploreStatus=createSelector(getExploreState,fromExplore.getExploreStatus);
export const getOtherUserInfo=(userId:string)=>createSelector(getExploreState,(state:ExploreState)=>{return fromExplore.getOtherUserInfo(state,userId)});

// Messages solectors
export const getMessagesState = createFeatureSelector<MessagesState>('messages');
export const getAllUserMessages = createSelector(getMessagesState, fromMessages.getAllUserMessages);
export const getThreadMessages = (threadId: string) => createSelector(getMessagesState, (state: MessagesState) => { return fromMessages.getThreadMessages(state, threadId); });
