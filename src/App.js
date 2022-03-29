import './App.css';
import React, {useState} from "react";
import {
  BrowserRouter,
  Routes,
  Route, Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser)
    setLoading(false)
  });

  if (loading) return (<p>Loading...</p>)
  const loginOrRedirection = user ? <Navigate to="/home" /> : <Login />
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={loginOrRedirection} />
          <Route path='/login' element={loginOrRedirection} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
