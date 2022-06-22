import AuthorizedPage from './AuthorizedPage'
import NavBar from './NavBar'
import PropTypes from 'prop-types'
import glove from '../assets/glove.png'
import StyledLink from './StyledLink'

interface Props {
	title: string
	barTitle: string
	backUrl: string
	backText: string
}

function FinishedLayout({ barTitle, title, backUrl, backText }: Props) {
	return (
		<AuthorizedPage className='finished-container'>
			<NavBar title={ barTitle }/>
			<div className='finished-card'>
				<img src={glove} width={200} height={200} alt='Ok!'/>
				<h2 className='finished-title'>{ title }</h2>
				<ul className='botonera-principal finished-botonera'>
					<li><StyledLink to={ backUrl} text={ backText} /></li>
					<li><StyledLink to='/home' text='Volver al inicio' /></li>
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
