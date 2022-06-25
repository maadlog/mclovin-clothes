import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import MovementsRepository from '../services/MovementsRepository'
import ProductsRepository from '../services/ProductsRepository'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'
import StyledButton from '../components/StyledButton'
import { Spending } from '../types/Spending'
import { ProductPurchase } from '../types/ProductPurchase'

function OutcomeDetails() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const paramsDate = searchParams.get('baseDate')
	const [data, setData] = useState<Array<Spending|ProductPurchase>>([])

	useEffect(() => {
		async function fetch () {
			const movementsRepo = new MovementsRepository()
			const productsRepo = new ProductsRepository()
			const spendings: Array<Spending|ProductPurchase> = await movementsRepo.getSpendings()
			const purchases = await productsRepo.getProductsPurchased()
			setData(spendings.concat(purchases))
		}
		fetch()
	}, [paramsDate])


	const edit = useCallback((spending: Spending) => {
		navigate('/movement/spending/'+spending.id)
	}, [])

	const remove = useCallback((spending: Spending) => {
		navigate('/movement/spending/'+spending.id+'/delete')
	}, [])

	const details = data
		.sort((x, y) => x.timestamp > y.timestamp ? -1 : 1)
		.map((x, index) => {
			const xAsAny: { desc?: string, description?: string, sale?: number, amount?: number } = x
			return (<div key={index} className='detalle-movimiento width-limit-content'>
				<p>{new Date(x.timestamp).toLocaleDateString()}</p>
				<p>{xAsAny.desc ?? xAsAny.description}</p> // TODO: Normalize description fields
				<p>${xAsAny.sale ?? x.amount}</p>
				{ x.entity === 'Spending' && <StyledButton onClick={() => edit(x as Spending)} text='Editar' /> }
				{ x.entity === 'Spending' && <StyledButton onClick={() => remove(x as Spending)} text='Borrar' /> }
			</div>)
		})

	return <AuthorizedPage className='movimiento-body'>
		<NavBar title='Egresos'/>
		{ details }
	</AuthorizedPage>
}
export default OutcomeDetails
