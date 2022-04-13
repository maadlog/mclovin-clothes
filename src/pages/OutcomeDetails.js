import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import MovementsRepository from '../services/MovementsRepository'
import ProductsRepository from '../services/ProductsRepository'
import { useSearchParams } from 'react-router-dom'

function OutcomeDetails() {
	let [searchParams] = useSearchParams()
	let paramsDate = searchParams.get('baseDate')
	const [data, setData] = useState([])

	useEffect(() => {
		const baseDate = new Date(paramsDate)
		async function fetch () {
			const movementsRepo = new MovementsRepository(baseDate)
			const productsRepo = new ProductsRepository(baseDate)
			const spendings = await movementsRepo.getSpendings()
			const purchases = await productsRepo.getProductsPurchased()
			setData(spendings.concat(purchases))
		}
		fetch()
	}, [paramsDate])

	const details = data
		.sort((x, y) => x.timestamp > y.timestamp ? -1 : 1)
		.map((x, index) => {
			return (<div key={index} className='detalle-movimiento width-limit-content'><p>{new Date(x.timestamp).toLocaleDateString()}</p><p>{x.desc}</p> <p>${x.sale ?? x.amount}</p></div>)
		})

	return <AuthorizedPage className='movimiento-body'>
		<NavBar title='Egresos'/>
		{ details }
	</AuthorizedPage>
}
export default OutcomeDetails
