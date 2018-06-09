import { Action } from '@ngrx/store';
import { Message } from '../../data_types/states.model';

export const ActionsMessagesConsts={
    INIT_MESSAGE_THREAD:"INIT_MESSAGE_THREAD",
    LOAD_MESSAGES_SUCCESS:"LOAD_MESSAGES_SUCCESS",
    LOAD_MESSAGES_FAIL:"LOAD_MESSAGES_FAIL",
    ADD_MESSAGE:"ADD_MESSAGE",
    ADD_MESSAGE_FAIL:"ADD_MESSAGE_FAIL",
}; 

export class InitMessageThread implements Action{
    readonly type=ActionsMessagesConsts.INIT_MESSAGE_THREAD;
    constructor(public payload?:string){}
}

export class LoadMessagesSuccess implements Action{
    readonly type=ActionsMessagesConsts.LOAD_MESSAGES_SUCCESS;
    constructor(public payload?:Message[]){}
}

export class LoadMessagesFail implements Action{
    readonly type=ActionsMessagesConsts.LOAD_MESSAGES_FAIL;
    constructor(public payload?:any){}
}

export class AddMessage implements Action{
    readonly type=ActionsMessagesConsts.ADD_MESSAGE;
    constructor(public payload?:Message){}
}

export class AddMessageFail implements Action{
    readonly type=ActionsMessagesConsts.ADD_MESSAGE_FAIL;
    constructor(public payload?:any){}
}

export type UserMessagesActions = InitMessageThread | LoadMessagesFail | LoadMessagesSuccess |
    AddMessage | AddMessageFail;