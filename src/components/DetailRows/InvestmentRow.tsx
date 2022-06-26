import { useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { Investment } from '../../types/Investment'
import { millisToFormDateString } from '../../utils/FormUtils'
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
		<p>{ millisToFormDateString(value.timestamp) }</p>
		<p>Inversi&oacute;n: { value.description }</p>
		<p>${ value.amount }</p>
		<StyledButton onClick={() => edit(value)} text='Editar' />
		<StyledButton onClick={() => remove(value)} text='Borrar' />
	</div>)
}
export default InvestmentRow
			