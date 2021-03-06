import { useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { ProductPurchase } from '../../types/ProductPurchase'
import { millisToFormDateString } from '../../utils/FormUtils'
import StyledButton from '../StyledButton'

interface Props {
    value: ProductPurchase
    navigate: NavigateFunction
}

const ProductPurchaseRow = ({ value, navigate }: Props) => {
	const edit = useCallback((purchase: ProductPurchase) => {
		navigate('/product/'+purchase.id)
	}, [])

	const remove = useCallback((purchase: ProductPurchase) => {
		navigate('/product/'+purchase.id+'/delete')
	}, [])

	return (<div className='detalle-movimiento width-limit-content'>
		<p>{ millisToFormDateString(value.timestamp) }</p>
		<p>Compra: { value.desc }</p>
		<p>${ value.amount }</p>
		<StyledButton onClick={() => edit(value)} text='Editar' />
		<StyledButton onClick={() => remove(value)} text='Borrar' />
	</div>)
}
export default ProductPurchaseRow
			