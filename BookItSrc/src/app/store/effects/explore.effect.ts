import { ActionsExploreConsts } from './../actions/explore.action';
import { getUserData } from './../reducers/userData.reducer';
import { MainState } from './../reducers/index';
import { LoadUserInfoSuccess, Logout, LoadMyBooksSuccess } from './../actions/userData.action';
import { UserState, UserSettingsState, ExtendedUserInfo, Category, UserUpdateType, LocationSettings, Location, Book } from './../../data_types/states.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as fromExploreActions from '../actions/explore.action';

@Injectable()
export class ExploreEffects {
    // members
    BooksNearByCol = {};
    combinedList;
    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private router: Router,
        private afs: AngularFirestore,
        private store: Store<MainState>) {
    }

    // effects
    @Effect({ dispatch: false })
    LoadBooksFromUsersNearBy: Observable<Action> = this.actions.ofType(fromExploreActions.ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY)
        .pipe(
            map((action: fromExploreActions.LoadBooksFromUsersNearBy) => action.payload),
            switchMap(usersNearBy => {
                console.log("A");
                if (usersNearBy.length === 0) {
                    //this.store.dispatch(new fromExploreActions.LoadUsersNearByFail());
                    console.log("no users nearby");
                    return Observable.of(null);
                }
                this.BooksNearByCol = {};
                usersNearBy.forEach(user => {
                    if (!this.BooksNearByCol[user])
                    {
                        console.log(user);
                        this.BooksNearByCol[user] = this.afs.collection('Users/' + user + '/Books')
                        .valueChanges()
                        .subscribe(userBooks => {
                            if (!userBooks) {
                                return;
                            }
                            this.store.dispatch(new fromExploreActions.LoadBooksFromUsersNearBySuccess(
                                {
                                    'userId': user,
                                    'books': userBooks
                                }
                            ));
                        });
                    }
                });

                return Observable.of(null);

            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        )

        @Effect({ dispatch: false })
        LoadOtherUserInfo: Observable<Action> = this.actions.ofType(fromExploreActions.ActionsExploreConsts.LOAD_OTHER_USER_INFO)
            .pipe(
                map((action: fromExploreActions.LoadOtherUserInfo) => action.payload),
                switchMap(userId => {
                    if (!userId) {
                        this.store.dispatch(new fromExploreActions.LoadOtherUserInfoFail());
                        return Observable.of(null);
                    }
                     this.afs.doc<UserSettingsState>(`Users/${userId}`)
                    .valueChanges()
                    .subscribe((userInfo)=>{
                        if (!userInfo) {
                            return;
                        }
                        this.store.dispatch(new fromExploreActions.LoadOtherUserInfoSuccess(
                            {
                                userId: userInfo.info.uid,
                                info:userInfo.info
                            }
                        ));
                    });
                    return Observable.of(null);
                }),
               
            
            )

       

}