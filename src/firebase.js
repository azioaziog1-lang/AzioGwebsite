import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwd9gzbwbrPeYAH2wt6F1fwWHi7KGxZdg",
  authDomain: "wired-sign-473105-c4.firebaseapp.com",
  projectId: "wired-sign-473105-c4",
  storageBucket: "wired-sign-473105-c4.firebasestorage.app",
  messagingSenderId: "480172290874",
  appId: "1:480172290874:web:093d7523ac21bc8bde1603",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(firebaseApp);

// Correctly export a promise that resolves to messaging instance (or null)
export const getMessagingObject = async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    console.error("Messaging not supported:", err);
    return null;
  }
};

// fetchToken function
export const fetchToken = async (setTokenFound, setFcmToken) => {
  try {
    const messaging = await getMessagingObject();
    if (!messaging) return;

    const currentToken = await getToken(messaging, {
      vapidKey:
        "",
    });

    if (currentToken) {
      setTokenFound(true);
      setFcmToken(currentToken);
    } else {
      setTokenFound(false);
      setFcmToken();
    }
  } catch (err) {
    console.error("Token fetch error:", err);
  }
};

// onMessageListener function
export const onMessageListener = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const messaging = await getMessagingObject();
      if (!messaging) return;

      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    } catch (err) {
      reject(err);
    }
  });
