import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "./App";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBYR6FZ-Rq4UGEkfWDmJfGlYIBw9j3NZvs",
  authDomain: "mclovin-clothes.firebaseapp.com",
  projectId: "mclovin-clothes",
  storageBucket: "mclovin-clothes.appspot.com",
  messagingSenderId: "496149582953",
  appId: "1:496149582953:web:9e4720ac6917b952913ef8"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
