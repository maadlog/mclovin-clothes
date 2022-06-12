import AuthorizedPage from './AuthorizedPage'
import NavBar from './NavBar'
import PropTypes from 'prop-types'
import StyledButton from './StyledButton'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteConfirmationLayout({ denomination, deleteCallback }) {

	const params = useParams()
	const navigate = useNavigate()

	return (
		
		<AuthorizedPage className='finished-container'>
			<NavBar title={'Seguro que quiere borrar ' + denomination + '?'}/>
			<div className='finished-card'>
				<h2 className='finished-title'>Esta es una operación que no puede deshacerse, de acuerdo?</h2>
				<ul className='botonera-principal finished-botonera'>
					<li><StyledButton onClick={() => deleteCallback(params.id).then(() => navigate(-1))} text="Si! Borrar definitivamente" /></li>
					<li><StyledButton onClick={() => navigate(-1)} text='Cancelar' /></li>
				</ul>
			</div>
		</AuthorizedPage>
	)
}

DeleteConfirmationLayout.propTypes = {
	denomination: PropTypes.string,
	deleteCallback: PropTypes.func,
}

export default DeleteConfirmationLayout
