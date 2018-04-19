import { Action } from '@ngrx/store';

export const ActionsConsts={

    LOAD_MY_BOOKS:"LOAD_MY_BOOKS",
    LOAD_MY_BOOKS_SUCCSES:"LOAD_MY_BOOKS_SUCCSES",
    LOAD_MY_BOOKS_FAIL:"LOAD_MY_BOOKS_FAIL",

}; 

export class LoadMyBooks implements Action{
    readonly type=ActionsConsts.LOAD_MY_BOOKS;
}

export class LoadMyBooksSuccses implements Action{
    readonly type=ActionsConsts.LOAD_MY_BOOKS_SUCCSES;
}

export class LoadMyBooksFail implements Action{
    readonly type=ActionsConsts.LOAD_MY_BOOKS_FAIL;
}

