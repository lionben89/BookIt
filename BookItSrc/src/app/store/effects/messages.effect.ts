import { getUserData } from './../reducers/userData.reducer';
import { MainState } from './../reducers/index';

import { Message } from './../../data_types/states.model';

import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import * as fromMessagesActions from '../actions/messages.action';

@Injectable()
export class MessagesEffects {
    // members
    private dbRef: any;
    private added_subscribe: any;

    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
        private store: Store<MainState>) {
        this.dbRef = this.afdb.database.ref('messages/');
    }

    // methods
    setMessage(messageSnap) {
        let message : Message = messageSnap.val();
        this.store.dispatch(new fromMessagesActions.LoadMessagesSuccess([message]));
    }

    // effects
    @Effect({ dispatch: false })
    InitMessageThread: Observable<Action> = this.actions.ofType(fromMessagesActions.ActionsMessagesConsts.INIT_MESSAGE_THREAD)
        .map((action: fromMessagesActions.InitMessageThread) => action.payload)
        .switchMap((threadId: string) => {
            if (!this.afAuth.authState) {
                this.store.dispatch(new fromMessagesActions.LoadMessagesFail());
                return Observable.of(null);
            }

            this.dbRef.limitToLast(100).orderByChild('threadId').equalTo(threadId).on('child_added', function(self) {
                return function(messageSnap) {
                    let message : Message = messageSnap.val();
                    self.store.dispatch(new fromMessagesActions.LoadMessagesSuccess([message]));
                    };
                }(this));
            return Observable.of(null);
        });

    @Effect({ dispatch: false })
    DiactivateMessageThread: Observable<Action> = this.actions.ofType(fromMessagesActions.ActionsMessagesConsts.DEACTIVATE_MESSAGE_THREAD)
        .map((action: fromMessagesActions.DeactivateMessageThread) => action.payload)
        .switchMap((threadId: string) => {
            this.dbRef.off('child_added');
            return Observable.of(null);
        });

    @Effect({ dispatch: false })
    AddMessage: Observable<Action> = this.actions.ofType(fromMessagesActions.ActionsMessagesConsts.ADD_MESSAGE)
        .map((action: fromMessagesActions.AddMessage) => action.payload)
        .switchMap((message: Message) => {
            if (!this.afAuth.authState) {
                this.store.dispatch(new fromMessagesActions.AddMessageFail());
                return Observable.of(null);
            }

            this.dbRef.push(message);
            return Observable.of(null);
        });
    
}
