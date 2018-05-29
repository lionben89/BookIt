import { ActionsExploreConsts, LoadBooksFromUsersNearBySuccess } from './../actions/explore.action';
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
    BooksNearByCol = [];
    combinedList;
    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private router: Router,
        private afs: AngularFirestore,
        private store: Store<MainState>) {
    }

    // effects
    @Effect()
    LoadBooksFromUsersNearBy: Observable<Action> = this.actions.ofType(fromExploreActions.ActionsExploreConsts.LOAD_BOOKS_FROM_USERS_NEAR_BY)
        .pipe(
            map((action: fromExploreActions.LoadBooksFromUsersNearBy) => action.payload),
            switchMap(usersNearBy => {
                if (!usersNearBy) {
                    //this.store.dispatch(new fromExploreActions.LoadUsersNearByFail());
                    console.log("no users nearby");
                    return Observable.of(null);
                }
                this.BooksNearByCol=[];
                usersNearBy.forEach(user => {
                    this.BooksNearByCol.push(this.afs.collection('Users/'+user+'/Books').valueChanges());
                });


                this.combinedList = combineLatest<any[]>(this.BooksNearByCol).pipe(
                    map(arr => arr.reduce((acc, cur) => acc.concat(cur) ) ),
                  )
                //return this.BooksNearByCol;
                return this.combinedList;
            }),
            map(booksPromise => {
                if (!booksPromise) {
                    //return new fromUserDataActions.Logout();
                }
                
                return new fromExploreActions.LoadBooksFromUsersNearBySuccess(booksPromise);
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        )

}