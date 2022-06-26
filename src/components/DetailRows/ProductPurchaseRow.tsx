import { Timestamp } from 'firebase/firestore'
import { useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { ProductPurchase } from '../../types/ProductPurchase'
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
		<p>{ Timestamp.fromMillis(value.timestamp).toDate().toISOString().split('T')[0] }</p>
		<p>Compra: { value.desc }</p>
		<p>${ value.amount }</p>
		<StyledButton onClick={() => edit(value)} text='Editar' />
		<StyledButton onClick={() => remove(value)} text='Borrar' />
	</div>)
}
export default ProductPurchaseRow
			