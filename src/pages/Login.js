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
		<div className='login-background'>
			<div className='login-card'>
				<h1>Digite la clave</h1>
				{ loading && <p className='loading'>Cargando...</p>}
				{ error && <p className='error'>{ error }</p>}
				<button className='boton-google' onClick={ loginWithGoogle }>
					<img src='./Google_G_Logo.svg' alt='Google Logo'/>
					<p>Inicia sesión con Google</p>
				</button>
			</div>
		</div>
	)
}

export default Login
