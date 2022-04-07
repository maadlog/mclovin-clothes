import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import PropTypes from 'prop-types'

function AuthorizedPage({ children, ...rest }) {
	const auth = getAuth()
	const [user, setUser] = useState(auth.currentUser)
	onAuthStateChanged(auth, (firebaseUser) => {
		if (firebaseUser) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			setUser(firebaseUser)
		} else {
			setUser(null)
		}
	})

	if (user) {
		return (<div {...rest}>
			{ children }
		</div>)
	} else {
		return (<div {...rest}>
			<h1>Parece que no hiciste login!</h1>
			<h2>Pasate por acá</h2>
			<Link to='/'>Click para ir al login</Link>
		</div>)
	}
}

AuthorizedPage.propTypes = {
	children: PropTypes.node
}

export default AuthorizedPage
