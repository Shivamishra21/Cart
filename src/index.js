import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/firestore";
//import * as serviceWorker from './serviceWorker';

//  The core Firebase JS SDK is always required and must be listed first -->
const firebaseConfig = {
  apiKey: "AIzaSyBDWixE8MabbsjFjCHS0AdwEwvJ8L0PvfQ",
  authDomain: "cart-1b5bc.firebaseapp.com",
  projectId: "cart-1b5bc",
  storageBucket: "cart-1b5bc.appspot.com",
  messagingSenderId: "324204661280",
  appId: "1:324204661280:web:5a01ef8c7ee726c70aca45",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById("root"));
