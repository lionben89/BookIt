
import { Action } from '@ngrx/store';
import * as fromMessages from '../actions/messages.action';
import { Message, MessagesState } from '../../data_types/states.model'

let initState: MessagesState = {
    
};
export function UserMessagesReducer(state: MessagesState = initState, action: fromMessages.UserMessagesActions) {
    switch (action.type) {
        case fromMessages.ActionsMessagesConsts.INIT_MESSAGE_THREAD: {
            let newState = {...state};
            let threadId = action.payload;
            newState[threadId] = new Array<Message>();
            console.log("Initialize new thread");
            return newState;
        }
        case fromMessages.ActionsMessagesConsts.LOAD_MESSAGES_SUCCESS: {
            let newState = {...state};
            action.payload.forEach((message: Message) => {
                    let threadId = message.threadId;
                    if (newState[threadId]) {
                        newState[threadId] = newState[threadId].slice();
                        newState[threadId].push(message);
                    } else {
                        newState[threadId] = new Array<Message>();
                        newState[threadId].push(message);
                    }
                });
            return newState;
        }
        default: return state;
    }
}

//selectors
export const getAllUserMessages = (state: MessagesState) => { return state }
export const getThreadMessages = (state: MessagesState, threadId) => {
        if (state[threadId])
        {
            return state[threadId];
        }
        return Array<Message>();
    }