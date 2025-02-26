// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDoP21MtL1jUPvGfXpLkjwX316LnNxkdrg",
    authDomain: "push-notif-3edc3.firebaseapp.com",
    projectId: "push-notif-3edc3",
    storageBucket: "push-notif-3edc3.firebasestorage.app",
    messagingSenderId: "809451072381",
    appId: "1:809451072381:web:f71fef1f1733bc2b1b7a14"
  };


const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);

// Request notification permission and get the FCM token
const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: "BNrInLSEXu-BuBEwvkuaTgE7cWgbyqSppsKtkvcyq_utK_mCcFgxEkOv8F4_zIPODUgRnjT4Z-4gnI1-74mfdlk", // Replace with your actual VAPID key
      });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        return currentToken;
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

const checkToken = async () => {
 const fcmToken = await messaging().getToken();
 if (fcmToken) {
    console.log(fcmToken);
 } 
}

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
});

export { messaging, requestForToken, checkToken };