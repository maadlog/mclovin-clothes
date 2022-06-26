import { useNavigate, useParams } from 'react-router-dom'
import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import MovementsRepository from '../services/MovementsRepository'
import { useEffect, useState } from 'react'
import { mapValueTo } from '../utils/FormUtils'
import StyledButton from '../components/StyledButton'
import { Movement as MovementInterface } from '../types/Movement'
import { Spending } from '../types/Spending'
import { Investment } from '../types/Investment'
import { Timestamp } from 'firebase/firestore'

const SPENDING_TYPE = 'spending'
const INVESTMENT_TYPE = 'investment'

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type MovementData = MakeOptional<MovementInterface, 'id'>

function Movement () {
	const navigate = useNavigate()
	const repo = new MovementsRepository()

	const params = useParams()
	const [type, setType] = useState(SPENDING_TYPE)
	const [state, setState] = useState<MovementData>({ amount: 0, description: '', timestamp: nowMillis() })

	const setDescription = (description: string) => {
		setState(prev => ({ ...prev, description }))
	}
	const setAmount = (amount: string) => {
		const num = Number.parseFloat(amount)
		const amountSec = Number.isNaN(num) ? 0 : num
		setState(prev => ({ ...prev, amount: amountSec }))
	}
	const setTimestamp = (dateString: string) => {
		const date = new Date(dateString)
		const millis = Timestamp.fromDate(date).toMillis()
		setState(prev => ({ ...prev, timestamp: millis }))
	}

	useEffect(() => {
		if (!params.id) { return }
		const isSpending = params.type === SPENDING_TYPE

		const fetch: Promise<MovementInterface> = isSpending ? repo.getSpendingById(params.id) : repo.getInvestmentById(params.id)
		fetch.then(doc => {
			setState(() => doc)
			setType(isSpending ? SPENDING_TYPE : INVESTMENT_TYPE)
		})
	}, [params])

	const finishMovement = () => {
		const repo = new MovementsRepository()
		if (type === 'spending') {
			repo.saveSpendingFull(state as Spending)
				.then(() => navigate('/movement/finished'))
		} else {
			repo.saveInvestmentFull(state as Investment)
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
					<label htmlFor='fecha'>Fecha</label>
					<input type='date' id='fecha' value={dateFromMillis(state.timestamp)} onChange={ mapValueTo(setTimestamp) }/>
				</div>
				<div className='row'>
					<label htmlFor='description'>Descripci&oacute;n</label>
					<input type='text' id='description' value={state.description} onChange={ mapValueTo(setDescription) }/>
				</div>
				<div className='row'>
					<label htmlFor='value'>Monto</label>
					<input type='number' id='value' value={state.amount || ''} onChange={ mapValueTo(setAmount) }/>
				</div>
				<div className='row'>
					<label htmlFor='type'>Tipo</label>
					<select id='type' value={type} onChange={ mapValueTo(setType) }>
						<option label='Gasto' value={SPENDING_TYPE} />
						<option label='Inversión' value={INVESTMENT_TYPE} />
					</select>
				</div>
				<StyledButton onClick={finishMovement} text='Confirmar' />
			</form>

		</AuthorizedPage>
	)
}

export default Movement

function dateFromMillis(timestampMillis: number): string {
	const result = Timestamp.fromMillis(timestampMillis).toDate().toISOString().split('T')[0]
	return result
}

function nowMillis(): number {
	const result = Timestamp.now().toMillis()
	return result
}