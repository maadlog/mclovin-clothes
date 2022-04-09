import AuthorizedPage from './AuthorizedPage'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import PropTypes from 'prop-types'
import glove from '../assets/glove.png'

function FinishedLayout({ barTitle, title, backUrl, backText }) {
	return (
		<AuthorizedPage>
			<NavBar title={ barTitle }/>
			<img src={glove} width={200} height={200} alt='Ok!'/>
			<h2>{ title }</h2>
			<ul>
				<li><Link to={ backUrl }>{ backText }</Link></li>
				<li><Link to='/home'>Volver al inicio</Link></li>
			</ul>
		</AuthorizedPage>
	)
}

FinishedLayout.propTypes = {
	barTitle: PropTypes.string,
	title: PropTypes.string,
	backUrl: PropTypes.string,
	backText: PropTypes.string,
}

export default FinishedLayout
