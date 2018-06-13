import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import * as fromStore from './store';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class MessagingService {

  messaging;
  isInChat;

  //const messaging = firebase.messaging();
  // messaging.usePublicVapidKey("BMnM51Nw1OckSyP3BNew-GVZCmKZ77NzOC_XeMXJRWwdr6OwYClzAz1vHnO76PFizy-70hP_TpvNUBmgkc-pRik");
  currentMessage = new BehaviorSubject(null)

  constructor(private store: Store<fromStore.MainState>, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private afStore: AngularFirestore, ) {
    firebase.initializeApp({
      messagingSenderId: "70467117606"
    });
    this.messaging = firebase.messaging();

  }


  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.store.select(fromStore.getContextNavbar).subscribe((state) => {
        this.isInChat = (state.myBooksOption === "my_books_chat" || state.myRequestsOption === "my_requests_chat");
      })
      const fromDoc = this.afStore.doc('Users/' + payload.data["gcm.notification.data"]).ref.get().then((user) => {
        payload.notification.title = "New Message From: " + user.data().info.displayName;
        this.currentMessage.next(payload);
        if (!this.isInChat) {
          this.store.dispatch(new fromStore.ShowMessege(payload.notification.title));
        }
      }
      );

    });

  }
}