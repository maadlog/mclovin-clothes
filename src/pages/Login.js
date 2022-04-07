import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const loginWithGoogle = (event) => {
		event.preventDefault()
		setLoading(true)

		const auth = getAuth()
		const provider = new GoogleAuthProvider()

		signInWithPopup(auth, provider)
			.then(() => {
				navigate('/home')
			})
			.catch((firebaseError) => {
				setError(firebaseError.message)
			})
	}


	return (
		<div>
			<h1>Digite la clave</h1>
			{ loading && <p>LOADING!!!</p>}
			{ error && <p>{ error }</p>}
			<button onClick={ loginWithGoogle }>Logueate con Google!</button>
		</div>
	)
}

export default Login
