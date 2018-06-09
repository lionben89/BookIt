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
        console.log("NewMessage");
        console.log(message);
        this.store.dispatch(new fromMessagesActions.LoadMessagesSuccess([message]));
    }

    // effects
    @Effect({ dispatch: false })
    InitMessageThread: Observable<Action> = this.actions.ofType(fromMessagesActions.ActionsMessagesConsts.INIT_MESSAGE_THREAD)
        .map((action: fromMessagesActions.InitMessageThread) => action.payload)
        .switchMap((threadId: string) => {
            console.log("LoadUserMessages");
            if (!this.afAuth.authState) {
                this.store.dispatch(new fromMessagesActions.LoadMessagesFail());
                return Observable.of(null);
            }

            console.log("Adding listeners");
            this.dbRef.limitToLast(12).orderByChild('threadId').equalTo(threadId).on('child_added', function(self) {
                return function(messageSnap) {
                    let message : Message = messageSnap.val();
                    console.log("NewMessage");
                    console.log(message);
                    self.store.dispatch(new fromMessagesActions.LoadMessagesSuccess([message]));
                    };
            }(this));
            this.dbRef.limitToLast(12).orderByChild('threadId').equalTo(threadId).on('child_changed', this.setMessage);
            return Observable.of(null);
        });

    @Effect({ dispatch: false })
    AddMessage: Observable<Action> = this.actions.ofType(fromMessagesActions.ActionsMessagesConsts.ADD_MESSAGE)
        .map((action: fromMessagesActions.AddMessage) => action.payload)
        .switchMap((message: Message) => {
            console.log("AddMessage");
            if (!this.afAuth.authState) {
                this.store.dispatch(new fromMessagesActions.AddMessageFail());
                return Observable.of(null);
            }

            console.log("Adding message");
            this.dbRef.push(message);
            return Observable.of(null);
        });
    
}
