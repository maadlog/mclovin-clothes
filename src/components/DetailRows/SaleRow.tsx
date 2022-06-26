import { Sale } from '../../types/Sale'
import { millisToFormDateString } from '../../utils/FormUtils'

interface Props {
    value: Sale
}

const SaleRow = ({ value }: Props) => {
	return (<div className='detalle-movimiento width-limit-content'>
		<p>{ millisToFormDateString(value.timestamp) }</p>
		<p>Venta: { value.desc }</p>
		<p>${ value.sale }</p>
	</div>)
}
export default SaleRow
			