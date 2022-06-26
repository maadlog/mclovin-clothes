import { Timestamp } from 'firebase/firestore'
import { useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { Investment } from '../../types/Investment'
import StyledButton from '../StyledButton'

interface Props {
    value: Investment
    navigate: NavigateFunction
}

const InvestmentRow = ({ value, navigate }: Props) => {
	const edit = useCallback((value: Investment) => {
		navigate('/movement/investment/'+value.id)
	}, [])

	const remove = useCallback((value: Investment) => {
		navigate('/movement/investment/'+value.id+'/delete')
	}, [])

	return (<div className='detalle-movimiento width-limit-content'>
		<p>{ Timestamp.fromMillis(value.timestamp).toDate().toISOString().split('T')[0] }</p>
		<p>{ value.description }</p>
		<p>${ value.amount }</p>
		<StyledButton onClick={() => edit(value)} text='Editar' />
		<StyledButton onClick={() => remove(value)} text='Borrar' />
	</div>)
}
export default InvestmentRow
			