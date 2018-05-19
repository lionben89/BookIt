import { getUserData } from './../reducers/userData.reducer';
import { MainState } from './../reducers/index';
import { LoadUserInfoSuccess, Logout } from './../actions/userData.action';
import { UserDataState, ExtendedUserInfo, Category, UserUpdateType, LocationSettings } from './../../data_types/states.model';
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

@Injectable()
export class UserDataEffects {
    // members
    private userDoc: AngularFirestoreDocument<UserDataState>;

    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private router: Router,
        private afs: AngularFirestore,
        private store: Store<MainState>) {
    }

    // methods
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
                return userRef.set(data);
            });
    }

    // effects
    @Effect()
    login: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOGIN)
        .map((action: fromUserDataActions.Login) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.googleLogin());
        })
        .map(credential => {
            this.router.navigate(['']);
            let userInfo: ExtendedUserInfo = {
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
                if (!authData) {
                    this.store.dispatch(new fromUserDataActions.LoadUserInfoFail());
                    return Observable.of(null);
                }
                this.userDoc = this.afs.doc<UserDataState>(`Users/${authData.uid}`);
                return this.userDoc.valueChanges();
            }),
            map(userInfo => {
                console.log(userInfo);
                if (!userInfo) {
                    //return new fromUserDataActions.Logout();
                }
                return new fromUserDataActions.LoadUserInfoSuccess(userInfo);
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        )

    @Effect()
    UpdateUserInfo: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.UPDATE_USER_INFO)
        .pipe(
            switchMap((action: fromUserDataActions.UpdateUserInfo) => {
                let updatedFields: UserDataState = {};
                switch (action.updateType) {
                    case UserUpdateType.SEARCH_RADIUS_KM:
                        if (!updatedFields.locationSettings) updatedFields.locationSettings = {};
                        updatedFields.locationSettings.searchRadiusKm = action.payload;
                        break;
                    case UserUpdateType.SHARE_MY_BOOKS:
                    if (!updatedFields.info) updatedFields.info = {};
                        updatedFields.info.shareMyBooks = action.payload;
                        break;
                    default:
                        // TODO: ERROR
                        console.error(action.updateType);
                        return Observable.of(null);
                }

                if (!this.userDoc) {
                    console.error("No userDoc");
                    this.store.dispatch(new fromUserDataActions.UpdateUserInfoFail());
                    return Observable.of(null);
                }
                return this.userDoc.set(updatedFields, { merge: true });
            }),
            map(() => {
                // TODO: change to success
                return new fromUserDataActions.UpdateUserInfoFail();
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        );



}



