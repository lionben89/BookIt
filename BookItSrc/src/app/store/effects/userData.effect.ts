import { getUserData } from './../reducers/userData.reducer';
import { MainState } from './../reducers/index';
import { LoadUserInfoSuccess, Logout, LoadMyBooksSuccess, RemoveRequestBookSuccess } from './../actions/userData.action';
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
import * as GeoFire from 'geofire';

import * as fromUserDataActions from '../actions/userData.action';
import * as fromExploreActions from '../actions/explore.action';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { } from "googlemaps";
import { MapsAPILoader } from "@agm/core";

@Injectable()
export class UserDataEffects {
    // members
    private dbRef: any;
    private geoFire: any;
    private geoQueries = new Array<any>();
    private searchRadius;
    private firstLoactionsLoad = true;

    private userDoc: AngularFirestoreDocument<UserSettingsState>;

    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private router: Router,
        private afs: AngularFirestore,
        private afdb: AngularFireDatabase,
        private store: Store<MainState>,
        private mapsAPILoader: MapsAPILoader) {
        this.dbRef = this.afdb.database.ref('locations/');
        this.geoFire = new GeoFire(this.dbRef);
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

    private addCurrentLocation() {
        let lat;
        let lng;
        let address;
        if ("geolocation" in navigator) {
            this.mapsAPILoader.load().then(() => {
                navigator.geolocation.getCurrentPosition(position => {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    /* get the formated address */
                    var geocoder = new google.maps.Geocoder();
                    var latlng = { lat, lng };
                    var splited;

                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status.toString() === "OK") {
                            if (results[0]) {
                                splited = results[0].formatted_address.split(",");
                                console.log(splited);

                                address = splited[0];
                                if (splited.length > 2) {
                                    address = address.concat(", ");
                                    address = address.concat(splited[1]);
                                }

                                console.log("address = " + address);

                                this.store.dispatch(new fromStore.AddLocation({
                                    label: "My Current Location",
                                    address: address,
                                    lat: lat,
                                    long: lng,
                                    active: true,
                                    id: "-1"
                                }));


                            } else {
                                console.log("No results found");
                            }
                        } else {
                            console.log("Geocoder failed due to: " + status);
                        }
                    });
                });
            });
        }
    }

    private updateRealtimeDBLocations(location: Location) {
        if (location.active) {
            let userID = this.userDoc.ref.id;

            let latLong = [location.lat, location.long];
            return this.geoFire.set(location.id, latLong).then(function (dbRef, location, userID) {
                return function () {
                    dbRef.child(location.id).update({ 'userID': userID });
                }
            }(this.dbRef, location, userID)
            );
        } else {
            return this.geoFire.remove(location.id);
        }
    }

    private registerToGeoQuery(locations: Location[]) {
        console.log("radius:" + this.searchRadius); //TODO: change regestration from load locations success
        this.store.dispatch(new fromStore.DeleteAllUsersNearBy());
        for (let oldQuery of this.geoQueries) {
            oldQuery.cancel();
        }
        this.geoQueries = new Array<any>();

        for (let location of locations) {
            let geoQuery
            if (location.active) {
                geoQuery = this.geoFire.query({
                    center: [location.lat, location.long],
                    radius: this.searchRadius  // TODO: get from user settings
                });


                let loggedUserID = this.userDoc.ref.id;
                geoQuery.on("key_entered", function (dbRef, loggedUserID, store) {
                    return function (key, location) {
                        dbRef.child(key).once('value').then(function (store) {
                            return function (snapshot) {
                                if (snapshot.val().userID !== loggedUserID) {
                                    console.log(snapshot.val().userID + " entered!");
                                    store.dispatch(new fromExploreActions.AddUserNearby(snapshot.val().userID));
                                };
                            }
                        }(store));
                    };
                }(this.dbRef, loggedUserID, this.store)
                );

                // TODO: remove users somehow (maybe set counter for keys of user and if 0 then remove)

                this.geoQueries.push(geoQuery);
            }
        }
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
                    case UserUpdateType.CATEGORIES:{
                        if (!updatedFields.favoriteCategories) updatedFields.favoriteCategories = {categories:[]};
                        updatedFields.favoriteCategories.categories=action.payload;
                        break;
                    }
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
                return locDocRef.set(location).then(() => {
                    return location;
                });
            }),
            map((location: Location) => {
                return new fromUserDataActions.AddLocationSuccess(location);
            })
        );

    @Effect({ dispatch: false })
    AddLocationSuccess: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.ADD_LOCATION_SUCCESS)
        .pipe(
            map((action: fromUserDataActions.AddLocationSuccess) => action.payload),
            switchMap((location: Location) => {
                return this.updateRealtimeDBLocations(location);
            })
        );

    @Effect()
    UpdateLocation: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.UPDATE_LOCATION)
        .pipe(
            map((action: fromUserDataActions.UpdateLocation) => action.payload),
            switchMap((location: Location) => {
                let userPath = this.userDoc.ref.path;
                let locDocRef = this.afs.doc(`${userPath}/Locations/${location.id}`);
                return locDocRef.update(location).then(() => {
                    return location;
                });
            }),
            map((location: Location) => {
                return new fromUserDataActions.UpdateLocationSuccess(location);
            })
        );

    @Effect({ dispatch: false })
    UpdateLocationSuccess: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.UPDATE_LOCATION_SUCCESS)
        .pipe(
            map((action: fromUserDataActions.UpdateLocationSuccess) => action.payload),
            switchMap((location: Location) => {
                return this.updateRealtimeDBLocations(location);
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
               
                if (locations.length === 0 && this.firstLoactionsLoad) {
                    this.addCurrentLocation();
                }
                this.firstLoactionsLoad = false;
                return new fromUserDataActions.LoadLocationsSuccess(locations);
            })

        );

    @Effect({ dispatch: false })
    LoadLocationsSuccess: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOAD_LOCATIONS_SUCCESS)
        .pipe(
            map((action: fromUserDataActions.LoadLocationsSuccess) => action.payload),
            switchMap((locations: Location[]) => {

                this.store.select<any>(fromStore.getUserSearchRadius).subscribe(state => {

                    this.searchRadius = state;
                    this.registerToGeoQuery(locations);
                });
                this.registerToGeoQuery(locations);

                /*var onReadyRegistration = geoQuery.on("ready", function() {
                console.log("*** 'ready' event fired - cancelling query ***");
                geoQuery.cancel();
                })*/

                return Observable.of(null);
            })
        );

    @Effect()
    RemoveLocation: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REMOVE_LOCATION)
        .pipe(
            map((action: fromUserDataActions.RemoveLocation) => action.payload),
            switchMap((location: Location) => {
                let userPath = this.userDoc.ref.path;
                return this.afs.doc(`${userPath}/Locations/${location.id}`).delete().then(() => {
                    return location;
                });
            }),
            map((location: Location) => {
                return new fromUserDataActions.RemoveLocationSuccess(location);
            })
        );

    @Effect({ dispatch: false })
    RemoveLocationSuccess: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REMOVE_LOCATION_SUCCESS)
        .pipe(
            map((action: fromUserDataActions.RemoveLocationSuccess) => action.payload),
            switchMap((location: Location) => {
                location.active = false;
                return this.updateRealtimeDBLocations(location);
            })
        );
    @Effect()
    UpdateBook: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.UPDATE_BOOK)
        .pipe(
            map((action: fromUserDataActions.UpdateBook) => action.payload),
            switchMap((book: Book) => {
                let userPath = this.userDoc.ref.path;
                let booksDocRef = this.afs.doc(`${userPath}/Books/${book.id}`);
                return booksDocRef.update(book).then(() => {
                    return book;
                });
            }),
            map((book: Book) => {
                let requestDocRef = this.afs.doc(`Users/${book.currentRequest.borrowerUid}/Requests/${book.id}`);
                if (book.currentRequest.borrowerUid) {
                    if (!book.currentRequest.approved && !book.currentRequest.pending) {
                        requestDocRef.delete().then(() => {
                            this.store.dispatch(new fromStore.ShowMessege("Request Rejected"));
                        });
                    }
                    else {
                        requestDocRef.update(book).then(() => {
                            this.store.dispatch(new fromStore.ShowMessege("Request Approved"));
                        });
                    }
                }
                return new fromUserDataActions.UpdateBookSuccess(book);
            })
        );

    @Effect()
    AddBook: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.ADD_BOOK)
        .pipe(
            map((action: fromUserDataActions.AddBook) => action.payload),
            switchMap((book: Book) => {
                console.log(book);
                let userPath = this.userDoc.ref.path;
                let bookID = this.afs.createId();
                book.id = bookID;
                let bookDocRef = this.afs.collection(userPath + '/Books').doc(bookID);
                if (!this.userDoc || !bookDocRef) {
                    console.error("No userDoc");
                    this.store.dispatch(new fromUserDataActions.AddBookFail());
                    return Observable.of(null);
                }
                return bookDocRef.set(book, { merge: true });
            }),
            map(() => {
                this.store.dispatch(new fromUserDataActions.ShowMessege("Book Was Added"));
                return new fromUserDataActions.AddBookSuccess();
            })
        );
    @Effect()
    RemoveBook: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REMOVE_BOOK)
        .pipe(
            map((action: fromUserDataActions.RemoveBook) => {
                return action.payload
            }),
            switchMap((book: Book) => {
                let userPath = this.userDoc.ref.path;
                return this.afs.doc(`${userPath}/Books/${book.id}`).delete().then(() => {
                    return book;
                });
            }),
            map((book: Book) => {
                if (book.currentRequest.borrowerUid && (book.currentRequest.pending || book.currentRequest.approved)) {
                    this.afs.doc(`Users/${book.currentRequest.borrowerUid}/Requests/${book.id}`).delete();
                }
                this.store.dispatch(new fromStore.ShowMessege("Book Removed"));
                return new fromUserDataActions.RemoveBookSuccess(book);
            })
        );

    /*@Effect({dispatch: false})
    RemoveLocationSuccess: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REMOVE_LOCATION_SUCCESS)
        .pipe(
            map((action: fromUserDataActions.RemoveLocationSuccess) => action.payload),
            switchMap((location: Location) => {
                location.active = false;
                return this.updateRealtimeDBLocations(location);
            })
        );*/

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
                return this.afs.collection(userPath + '/Books').valueChanges();
            }),
            map((books) => {
                return new fromUserDataActions.LoadMyBooksSuccess(books);
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        );

    @Effect()
    LoadMyRequests: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.LOAD_MY_REQUESTS)
        .pipe(
            map((action: fromUserDataActions.LoadMyRequests) => action.payload),
            switchMap(payload => this.afAuth.authState),
            switchMap(authData => {
                if (!authData) {
                    this.store.dispatch(new fromUserDataActions.LoadMyRequestsFail());
                    return Observable.of(null);
                }
                let userPath = this.userDoc.ref.path;
                let x = this.afs.collection(userPath + '/Requests').valueChanges();
                return x;
            }),
            map((books) => {
                return new fromUserDataActions.LoadMyRequestsSuccess(books);
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        );

    @Effect()
    RemoveRequest: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REMOVE_REQUEST_BOOK)
        .pipe(
            map((action: fromUserDataActions.RemoveRequestBook) => {
                return action.payload
            }),
            switchMap((book: Book) => {
                book.currentRequest.pending = false;
                book.currentRequest.approved = false;
                let userPath = this.userDoc.ref.path;
                return this.afs.doc(`Users/${book.ownerUid}/Books/${book.id}`).set(book, { merge: true }).then(() => {
                    return book;
                });

            }),
            map((book: Book) => {
                this.afs.doc(`Users/${book.currentRequest.borrowerUid}/Requests/${book.id}`).delete().then(() => {
                    this.store.dispatch(new fromUserDataActions.ShowMessege("Request Removed"));
                });
                return new fromUserDataActions.RemoveRequestBookSuccess(book);
            }),
    );

    @Effect()
    RequestBook: Observable<Action> = this.actions.ofType(fromUserDataActions.ActionsUserDataConsts.REQUEST_BOOK)
        .pipe(
            map((action: fromUserDataActions.RequestBook) => action.payload),
            switchMap((book: Book) => {
                let requestId = this.afs.createId();
                let request = {
                    requestId: requestId,
                    borrowerUid: this.userDoc.ref.id,
                    approved: false,
                    pending: true,
                    startTime: null,
                };

                console.log(book);
                let bookDocRef = this.afs.collection('Users/' + book.ownerUid + '/Books').doc(book.id);
                if (book.currentRequest && (book.currentRequest.pending) || (book.currentRequest.approved)) {

                    this.store.dispatch(new fromUserDataActions.ShowMessege("Book Was Already Requested"));
                    return Observable.of(null);
                }
                book.currentRequest = request;
                bookDocRef.set(book, { merge: true });
                return bookDocRef.valueChanges();
            }),
            map((book) => {
                if (book && (book.currentRequest) && (book.currentRequest.borrowerUid)) {
                    let bookDocRef = this.afs.collection('Users/' + book.currentRequest.borrowerUid + '/Requests').doc(book.id);
                    return bookDocRef.set(book, { merge: true }).then(() => {
                        if (book && (book.currentRequest) && (book.currentRequest.pending && !book.currentRequest.approved))
                        this.store.dispatch(new fromStore.ShowMessege("Book Requested"));
                    });
                }
            }),
            map((book) => {
                return new fromUserDataActions.RequestBookSuccess();
            })
            //.catch(err => Observable.of(new fromUserDataActions.ErrorHandler()));
        )
}
