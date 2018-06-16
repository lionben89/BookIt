importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


firebase.initializeApp({
  messagingSenderId: "70467117606"
});

const messaging = firebase.messaging();
//messaging.usePublicVapidKey("BMnM51Nw1OckSyP3BNew-GVZCmKZ77NzOC_XeMXJRWwdr6OwYClzAz1vHnO76PFizy-70hP_TpvNUBmgkc-pRik");