import { MainState } from './../reducers/index';
import { LoadFavoriteCategories, LoadUserInfoSuccess, Logout } from './../actions/userData.action';
import { UserDataState, ExtendedUserInfo, Category } from './../../data_types/states.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as fromUserDataActions from '../actions/userData.action';
import { UserInfo } from '@firebase/auth-types';

@Injectable()
export class UserDataEffects {

    private googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
    private updateUserData(userData: ExtendedUserInfo) {
        const userRef: AngularFirestoreDocument<UserDataState> = this.afs.doc(`Users/${userData.uid}`);

        const data: UserDataState = {
            info: userData,
        };

        return userRef.update(data)
            .catch((error) => {
                data.info.borrowRestricted = false;
                data.info.rating = 5.0;
                data.info.numRates = 0;
                data.info.maxAllowedOpenBorrows = 1;
                data.locationSettings = {
                    useCurrentLocation: true,
                    locations: [],
                    searchRadiusKm: 3.0,
                    //displayMetric: true,
                };
                userRef.set(data);
            });
    }
    private user: string
    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private router: Router,
        private afs: AngularFirestore,
        private store: Store<MainState>) {
        store.select<any>(fromStore.getUserDataID).subscribe(state => {
            console.log(state);
            this.user = state;
        });
    }

    @Effect()
    login: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOGIN)
        .map((action: fromUserDataActions.Login) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.googleLogin());
        })
        .map(credential => {
            this.router.navigate(['']);
            let userInfo : ExtendedUserInfo = {
                uid: credential.user.uid,
                email: credential.user.email,
                photoURL: credential.user.photoURL,
                displayName: credential.user.displayName,
                accountDeleted: false,
            };
            return new fromUserDataActions.LoginSuccess(userInfo);
        })
        .catch(err => {
            return Observable.of(new fromUserDataActions.ErrorHandler({ error: err.message }));
        })


    @Effect()
    loginSuccess: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOGIN_SUCCESS)
        .map((action: fromUserDataActions.Login) => action.payload)
        .switchMap((payload: ExtendedUserInfo) => {
            return this.updateUserData(payload);
        })
        .map(updateResult => {
            this.router.navigate(['']);
            return new fromUserDataActions.LoadUserInfo();
        })
        .catch(err => {
            return Observable.of(new fromUserDataActions.ErrorHandler({ error: err.message }));
        })

    @Effect()
    logout: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOGOUT)
        .map((action: fromUserDataActions.Logout) => action.payload)
        .switchMap(payload => {
            // TODO: if (this.afAuth.authState)
            return Observable.of(this.afAuth.auth.signOut());
        })
        .map(authData => {
            this.router.navigate(['/login']);
            return new fromUserDataActions.LoadUserInfoFail(); // TODO: why fail? //
        })
        .catch(err => Observable.of(new fromUserDataActions.ErrorHandler({ error: err.message })));

    @Effect()
    LoadUserInfo: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOAD_USER_INFO)
        .pipe(
            map((action: fromUserDataActions.LoadUserInfo) => action.payload),
            switchMap(payload => this.afAuth.authState),
            switchMap(authData => {
                if (authData) {
                    return this.afs.doc<UserDataState>(`Users/${authData.uid}`).valueChanges();
                }
                else {
                    this.store.dispatch(new fromUserDataActions.LoadUserInfoFail());
                    return Observable.of(null);
                }
            }),
            map(userInfo => {
                if (!userInfo) {
                    return new fromUserDataActions.Logout();
                }
                return new fromUserDataActions.LoadUserInfoSuccess(userInfo);
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        )

    @Effect()
    LoadFavoriteCategories$: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES)
        .pipe(
            switchMap(action => {
                console.log(action);
                return this.afs.collection('Users', ref => {
                    console.log(ref);
                    return ref;
                }).stateChanges()
            }),
            mergeMap(actions => actions),
            map(action => {
                return {
                    type: fromUserDataActions.ActionsUserDataConsts.LOAD_FAVORITE_CATEGORIES_SUCCESS,
                    payload: {
                        ...action.payload.doc.data(),
                    }
                }
            })
        );



}



