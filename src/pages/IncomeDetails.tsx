import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import MovementsRepository from '../services/MovementsRepository'
import SalesRepository from '../services/SalesRepository'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Investment } from '../types/Investment'
import { Sale } from '../types/Sale'
import InvestmentRow from '../components/DetailRows/InvestmentRow'
import SaleRow from '../components/DetailRows/SaleRow'

function IncomeDetails() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const paramsDate = searchParams.get('baseDate')
	const [data, setData] = useState<Array<Sale|Investment>>([])

	useEffect(() => {
		async function fetch () {
			const baseDate = paramsDate ? new Date(paramsDate) : new Date()
			const startOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)

			const movementsRepo = new MovementsRepository()
			const salesRepo = new SalesRepository()

			const sales: Array<Sale|Investment> = await salesRepo.getSalesFrom(startOfMonth)
			const investments = await movementsRepo.getInvestmentsFrom(startOfMonth)

			setData(sales.concat(investments))
		}
		fetch()
	}, [paramsDate])

	const details = data
		.sort((x, y) => x.timestamp > y.timestamp ? -1 : 1)
		.map((x) => {
			switch (x.entity) {
			case 'Investment':
				return (<InvestmentRow key={x.id} value={x as Investment} navigate={navigate}/>)
			default:
				return (<SaleRow key={x.id} value={x as Sale}/>)
			}
		})

	return <AuthorizedPage className='movimiento-body'>
		<NavBar title='Ingresos'/>
		{ details }
	</AuthorizedPage>
}
export default IncomeDetails
