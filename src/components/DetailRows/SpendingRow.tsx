import { useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { Spending } from '../../types/Spending'
import { millisToFormDateString } from '../../utils/FormUtils'
import StyledButton from '../StyledButton'

interface Props {
    value: Spending
    navigate: NavigateFunction
}

const SpendingRow = ({ value, navigate }: Props) => {
	const edit = useCallback((spending: Spending) => {
		navigate('/movement/spending/'+spending.id)
	}, [])

	const remove = useCallback((spending: Spending) => {
		navigate('/movement/spending/'+spending.id+'/delete')
	}, [])

	return (<div className='detalle-movimiento width-limit-content'>
		<p>{ millisToFormDateString(value.timestamp) }</p>
		<p>Gasto: { value.description }</p>
		<p>${ value.amount }</p>
		<StyledButton onClick={() => edit(value)} text='Editar' />
		<StyledButton onClick={() => remove(value)} text='Borrar' />
	</div>)
}
export default SpendingRow
			