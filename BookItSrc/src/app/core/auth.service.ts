import { UserSettingsState } from './../data_types/states.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';




@Injectable()
export class AuthService {

  user: Observable<UserSettingsState>;

  constructor(private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afStore.doc<UserSettingsState>(`Users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate(['']);
      });
  }

  private updateUserData(authUser) {
    const userRef: AngularFirestoreDocument<UserSettingsState> = this.afStore.doc(`Users/${authUser.uid}`);

    const data: UserSettingsState = {
      info: {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
        accountDeleted: false,
        shareMyBooks:true,
      }
    };

    return userRef.update(data)
      .catch((error) => {
        /* data.borrowRestricted = false;
         data.rating = 5.0;
         data.numRates = 0;
         data.maxAllowedOpenBorrows = 1;
         data.locationSettings = {
           useCurrentLocation: true,
           searchRadiusKm: 3.0,
           displayMetric: true
         };
         userRef.set(data);*/
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

}
