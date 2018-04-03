/*
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.firestore.document('Users/{uid}').onCreate((snap, context) => {
  console.log("test");
  const testRef = admin.firestore().collection('Users').doc('test');
  const user = snap.data();
  console.log(user);
  const displayName = user.displayName;
  return testRef.update({functionField: displayName});
});
*/
