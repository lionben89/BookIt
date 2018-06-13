const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.fcmSend = functions.database.ref('/messages/{messageId}').onCreate(event => {

  let val = event.val();
  console.log("event: ", val);
  const message = val.content;
  console.log(message);
  const userId = val.to;
  
  const payload = {
    notification: {
      title: "BamBook! books share app",
      body: "Hi! you have a new message",
      icon: "https://placeimg.com/250/250/people",
      data:val.from,
    },
    
  };
  console.log("payload: ",payload);
  
  admin.database()
    .ref(`/fcmTokens/${userId}`)
    .once('value')
    .then(token => token.val())
    .then(userFcmToken => {
      return admin.messaging().sendToDevice(userFcmToken, payload)
    })
    .then(res => {
      console.log("Sent Successfully", res);
    })
    .catch(err => {
      console.log(err);
    });
});