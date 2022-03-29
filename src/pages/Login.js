import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import { auth } from "firebaseui";
import {useEffect} from "react";

function Login() {
  useEffect(() => {
    const ui = new auth.AuthUI(getAuth());
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/home',
      signInOptions: [
        // List of OAuth providers supported.
        GoogleAuthProvider.PROVIDER_ID
      ]
    });
  }, [])


  return (
    <div>
      <h1>Digite la clave</h1>
      <div id="firebaseui-auth-container" />
    </div>
  );
}

export default Login;
