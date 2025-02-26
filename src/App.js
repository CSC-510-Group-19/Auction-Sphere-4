import './App.css'
// import { Routes ,Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Signup from './components/LoginSignup/Signup.js'
import Login from './components/LoginSignup/Login'
import Products from './components/Products'
import Sell from './components/Sell'
import ProductDetails from './components/ProductDetails'
import AddBid from './components/AddBid'
import Profile from './components/Profile'
import { requestForToken, messaging, checkToken} from "./components/firebase";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from "react";


function App() {
  const [fcmToken, setFcmToken] = useState(null);

  // Immediately request for the FCM token on app load
  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        // Requesting permission and retrieving token
        checkToken()
        const token = await requestForToken();
        setFcmToken(token);
        toast.success('FCM Token retrieved successfully!');
      } catch (error) {
        toast.error('Failed to retrieve FCM token');
        console.error(error);
      }
    };

    fetchFCMToken();  // Trigger token request immediately on load

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);

          messaging.onMessage((payload) => {
            console.log("Message received. ", payload);
            new Notification(payload.notification.title, {
              body: payload.notification.body,
              icon: payload.notification.icon,
            });
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <p>{fcmToken ? `FCM Token: ${fcmToken}` : 'No token retrieved yet.'}</p>
            <Routes>
                <Route path="/" element={<About />}>
                    {/* <Route index element={<Signup />} /> */}
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/details/:id" element={<ProductDetails />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
        // </BrowserRouter>
    )
}

export default App
