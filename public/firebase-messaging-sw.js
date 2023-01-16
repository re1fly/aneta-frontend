importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCZTgLpZkjyjb5YcweXVhOosHNASd3VGaM",
    authDomain: "anetaapp-80352.firebaseapp.com",
    databaseURL: "https://anetaapp-80352-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "anetaapp-80352",
    storageBucket: "anetaapp-80352.appspot.com",
    messagingSenderId: "720796861195",
    appId: "1:720796861195:web:a7fd2b72ab86a42287980e",
    measurementId: "G-EY34WYS0T9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})


