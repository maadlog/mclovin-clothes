import { Navigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function AuthorizedPage<T extends { children: React.ReactNode }>({ children, ...rest }: T){
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
		return (
			<Navigate to={'/'} />
		)
	}
}

AuthorizedPage.propTypes = {
	children: PropTypes.node
}

export default AuthorizedPage
