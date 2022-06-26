import { Timestamp } from 'firebase/firestore'
import { Sale } from '../../types/Sale'

interface Props {
    value: Sale
}

const SaleRow = ({ value }: Props) => {
	return (<div className='detalle-movimiento width-limit-content'>
		<p>{ Timestamp.fromMillis(value.timestamp).toDate().toISOString().split('T')[0] }</p>
		<p>{ value.desc }</p>
		<p>${ value.sale }</p>
	</div>)
}
export default SaleRow
			