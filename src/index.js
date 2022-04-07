import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBYR6FZ-Rq4UGEkfWDmJfGlYIBw9j3NZvs',
	authDomain: 'mclovin-clothes.firebaseapp.com',
	databaseURL: 'https://mclovin-clothes-default-rtdb.firebaseio.com',
	projectId: 'mclovin-clothes',
	storageBucket: 'mclovin-clothes.appspot.com',
	messagingSenderId: '496149582953',
	appId: '1:496149582953:web:9e4720ac6917b952913ef8'
}

const app = initializeApp(firebaseConfig)

const db = getDatabase(app)
const firestore = getFirestore(app)

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
	// Point to the RTDB emulator running on localhost.
	connectDatabaseEmulator(db, 'localhost', 9000)
	connectFirestoreEmulator(firestore, 'localhost', 8080)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
