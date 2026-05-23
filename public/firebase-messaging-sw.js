importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDwd9gzbwbrPeYAH2wt6F1fwWHi7KGxZdg",
  authDomain: "wired-sign-473105-c4.firebaseapp.com",
  projectId: "wired-sign-473105-c4",
  storageBucket: "wired-sign-473105-c4",
  messagingSenderId: "480172290874",
  appId: "1:480172290874:web:57ec56b9dc310afdde1603",
  measurementId: "G-GVN6ZV8EE8",
  
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
