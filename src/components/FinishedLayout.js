import AuthorizedPage from './AuthorizedPage'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import PropTypes from 'prop-types'
import glove from '../assets/glove.png'

function FinishedLayout({ barTitle, title, backUrl, backText }) {
	return (
		<AuthorizedPage className='finished-container'>
			<NavBar title={ barTitle }/>
			<div className='finished-card'>
				<img src={glove} width={200} height={200} alt='Ok!'/>
				<h2 className='finished-title'>{ title }</h2>
				<ul className='botonera-principal finished-botonera'>
					<li><Link to={ backUrl }>{ backText }</Link></li>
					<li><Link to='/home'>Volver al inicio</Link></li>
				</ul>
			</div>
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
