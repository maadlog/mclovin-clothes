import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavBar ({ title }) {

	return (<header>
		<h1>{title}</h1>
		<nav>
			<Link to='/home'>Inicio</Link>
			<button onClick={ () => { getAuth().signOut()} }>Cerrar Sesi&oacute;n</button>
		</nav>
	</header>
	)
}

NavBar.propTypes = {
	title: PropTypes.string
}

export default NavBar
