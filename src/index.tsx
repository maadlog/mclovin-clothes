import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

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

const firestore = getFirestore(app)
const storage = getStorage(app)

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
	connectFirestoreEmulator(firestore, 'localhost', 8080)
	connectStorageEmulator(storage, 'localhost', 9199)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
