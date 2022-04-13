import { useNavigate } from 'react-router-dom'
import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import MovementsRepository from '../services/MovementsRepository'
import { useState } from 'react'
import { mapValueTo } from '../utils/FormUtils'
import StyledButton from '../components/StyledButton'

function Movement () {
	const navigate = useNavigate()
	const [amount, setAmount] = useState(0)
	const [description, setDescription] = useState('')
	const [type, setType] = useState('spending')
	const finishMovement = (event) => {
		event.preventDefault()
		const repo = new MovementsRepository()
		if (type === 'spending') {
			repo.saveSpending(description, amount)
				.then(() => navigate('/movement/finished'))
		} else {
			repo.saveInvestment(description, amount)
				.then(() => navigate('/movement/finished'))
		}
	}

	return (
		<AuthorizedPage className='movimiento-body'>
			<NavBar title='Nuevo movimiento'/>
			<div className='ayuda-card'>
				<h3> Ayuda para algunos movimientos comunes: </h3>
				<ul>
					<li><span className='bold'>Alquiler:</span> Cargar un gasto y si lo paga Martín o Mamá, una inversión</li>
					<li><span className='bold'>Compras a Proveedores:</span> Cargar una inversión con el total que pusimos, el gasto lo calcula solo cuando cargas las prendas</li>
					<li><span className='bold'>Yerba, Edenor, ABL, etc.:</span> Todos gastos</li>
				</ul>
			</div>
			<form className='form-movimiento'>
				<div className='row'>
					<label htmlFor='description'>Descripci&oacute;n</label>
					<input type='text' id='description' onChange={ mapValueTo(setDescription) }/>
				</div>
				<div className='row'>
					<label htmlFor='value'>Monto</label>
					<input type='number' id='value' onChange={ mapValueTo(setAmount) }/>
				</div>
				<div className='row'>
					<label htmlFor='type'>Tipo</label>
					<select id='type' onChange={ mapValueTo(setType) }>
						<option label='Gasto' value='spending' />
						<option label='Inversión' value='investment' />
					</select>
				</div>
				<StyledButton onClick={finishMovement} text='Confirmar' />
			</form>

		</AuthorizedPage>
	)
}

export default Movement
