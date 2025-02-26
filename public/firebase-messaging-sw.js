import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDoP21MtL1jUPvGfXpLkjwX316LnNxkdrg",
  authDomain: "push-notif-3edc3.firebaseapp.com",
  projectId: "push-notif-3edc3",
  storageBucket: "push-notif-3edc3.firebasestorage.app",
  messagingSenderId: "809451072381",
  appId: "1:809451072381:web:f71fef1f1733bc2b1b7a14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Listen for background messages
onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '\src\assets\Logo2.png', // Replace with your icon path
  });
});