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
    private userDoc: AngularFirestoreDocument<UserSettingsState>;

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
    private facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
    private updateUserData(userData: ExtendedUserInfo) {
        const userRef: AngularFirestoreDocument<UserSettingsState> = this.afs.doc(`Users/${userData.uid}`);

        const data: UserSettingsState = {
            info: userData,
        };

        //return userRef.set(data, { merge: true })

        return userRef.update(data)
            .catch((error) => {
                data.info.borrowRestricted = false;
                data.info.rating = 5.0;
                data.info.numRates = 0;
                data.info.maxAllowedOpenBorrows = 1;
                data.info.shareMyBooks = true;
                data.locationSettings = {
                    useCurrentLocation: true,
                    searchRadiusKm: 3.0,
                    //displayMetric: true,
                };
                return userRef.set(data, { merge: true });

            });
    }

    // effects
    @Effect()
    loginGoogle: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOGIN_GOOGLE)
        .map((action: fromUserDataActions.LoginGoogle) => action.payload)
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
    loginFacebook: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOGIN_FACEBOOK)
        .map((action: fromUserDataActions.LoginFacebook) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.facebookLogin());
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
        .map((action: fromUserDataActions.LoginGoogle) => action.payload)
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
                this.userDoc = this.afs.doc<UserSettingsState>(`Users/${authData.uid}`);
                return this.userDoc.valueChanges();
            }),
            map(userInfo => {
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
                let updatedFields: UserSettingsState = {};
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

        @Effect()
        AddLocation: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.ADD_LOCATION)
            .pipe(
                map((action: fromUserDataActions.AddLocation) => action.payload),
                switchMap((location: Location) => {
                    let userPath = this.userDoc.ref.path;
                    location.id = this.afs.createId();
                    let locDocRef = this.afs.collection(`${userPath}/Locations`).doc(location.id);
                    return locDocRef.set(location);
                }),
                map(() => {
                    return new fromUserDataActions.AddLocationSuccess();
                })
            );

        @Effect()
        LoadLocations: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOAD_LOCATIONS)
            .pipe(
                map((action: fromUserDataActions.LoadLocations) => action.payload),
                switchMap(payload => this.afAuth.authState),
                switchMap(authData => {
                    if (!authData) {
                        this.store.dispatch(new fromUserDataActions.LoadUserInfoFail());
                        return Observable.of(null);
                    }
                    let userPath = this.userDoc.ref.path;
                    return this.afs.collection(`${userPath}/Locations`).valueChanges();
                }),
                map(locations => {
                    return new fromUserDataActions.LoadLocationsSuccess(locations);
                })
                //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
            );

        @Effect()
        UpdateLocation: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.UPDATE_LOCATION)
            .pipe(
                map((action: fromUserDataActions.UpdateLocation) => action.payload),
                switchMap((location: Location) => {
                    let userPath = this.userDoc.ref.path;
                    let locDocRef = this.afs.doc(`${userPath}/Locations/${location.id}`);
                    return locDocRef.update(location);
                }),
                map(() => {
                    return new fromUserDataActions.UpdateLocationSuccess();
                })
            );

        @Effect()
        RemoveLocation: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REMOVE_LOCATION)
            .pipe(
                map((action: fromUserDataActions.UpdateLocation) => action.payload),
                switchMap((location: Location) => {
                    let userPath = this.userDoc.ref.path;
                   return this.afs.doc(`${userPath}/Locations/${location.id}`).delete();
                }),
                map(() => {
                    return new fromUserDataActions.RemoveLocationSuccess();
                })
            );

        @Effect()
        AddBook: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.ADD_BOOK)
        .pipe(
            map((action: fromUserDataActions.AddBook) => action.payload),
            switchMap((book: Book) => {
                console.log(book);
                let userPath=this.userDoc.ref.path;
                let bookID=this.afs.createId();
                let bookDocRef=this.afs.collection(userPath+'/Books').doc(bookID);
                if (!this.userDoc || !bookDocRef) {
                    console.error("No userDoc");
                    this.store.dispatch(new fromUserDataActions.AddBookFail());
                    return Observable.of(null);
                }
                return bookDocRef.set(book, { merge: true });
            }),
            map(() => {
                return new fromUserDataActions.AddBookSuccess();
            })
        );

        @Effect()
        LoadMyBooks: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOAD_MY_BOOKS)
            .pipe(
                map((action: fromUserDataActions.LoadMyBooks) => action.payload),
                switchMap(payload => this.afAuth.authState),
                switchMap(authData => {
                    if (!authData) {
                        this.store.dispatch(new fromUserDataActions.LoadMyBooksFail());
                        return Observable.of(null);
                    }
                    let userPath = this.userDoc.ref.path;
                    return this.afs.collection(userPath+'/Books').valueChanges();
                }),
                map((books) => {            
                    return new fromUserDataActions.LoadMyBooksSuccess(books);
                })
                //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
            );
}
