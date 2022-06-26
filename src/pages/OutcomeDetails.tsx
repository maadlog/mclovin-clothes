import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import MovementsRepository from '../services/MovementsRepository'
import ProductsRepository from '../services/ProductsRepository'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Spending } from '../types/Spending'
import { ProductPurchase } from '../types/ProductPurchase'
import SpendingRow from '../components/DetailRows/SpendingRow'
import ProductPurchaseRow from '../components/DetailRows/ProductPurchaseRow'

function OutcomeDetails() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const paramsDate = searchParams.get('baseDate')
	const [data, setData] = useState<Array<Spending|ProductPurchase>>([])

	useEffect(() => {
		async function fetch () {
			const baseDate = paramsDate ? new Date(paramsDate) : new Date()
			const startOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)

			const movementsRepo = new MovementsRepository()
			const productsRepo = new ProductsRepository()
			const spendings: Array<Spending|ProductPurchase> = await movementsRepo.getSpendingsFrom(startOfMonth)
			const purchases = await productsRepo.getProductsPurchasedFrom(startOfMonth)
			setData(spendings.concat(purchases))
		}
		fetch()
	}, [paramsDate])

	const details = data
		.sort((x, y) => x.timestamp > y.timestamp ? -1 : 1)
		.map((x) => {
			switch (x.entity) {
			case 'Spending':
				return <SpendingRow key={x.id} value={x as Spending} navigate={navigate} />
			default:
				return <ProductPurchaseRow key={x.id} value={x as ProductPurchase} navigate={navigate} />
			}
		})

	return <AuthorizedPage className='movimiento-body'>
		<NavBar title='Egresos'/>
		{ details }
	</AuthorizedPage>
}
export default OutcomeDetails
