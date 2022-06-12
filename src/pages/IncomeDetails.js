import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import MovementsRepository from '../services/MovementsRepository'
import SalesRepository from '../services/SalesRepository'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StyledButton from '../components/StyledButton'
import { useCallback } from 'react'

function IncomeDetails() {
	let [searchParams] = useSearchParams()
	let navigate = useNavigate()
	let paramsDate = searchParams.get('baseDate')
	const [data, setData] = useState([])

	useEffect(() => {
		const baseDate = new Date(paramsDate)
		async function fetch () {
			const movementsRepo = new MovementsRepository(baseDate)
			const salesRepo = new SalesRepository(baseDate)

			const sales = await salesRepo.getSales()
			const investments = await movementsRepo.getInvestments()

			setData(sales.concat(investments))
		}
		fetch()
	}, [paramsDate])

	const edit = useCallback((investment) => {
		navigate('/movement/investment/'+investment.id)
	}, [])

	const remove = useCallback((investment) => {
		navigate('/movement/investment/'+investment.id+'/delete')
	}, [])

	const details = data
		.sort((x, y) => x.timestamp > y.timestamp ? -1 : 1)
		.map((x, index) => {
			return (<div key={index} className='detalle-movimiento width-limit-content'>
				<p>{new Date(x.timestamp).toLocaleDateString()}</p>
				<p>{x.desc}</p>
				<p>${x.sale ?? x.amount}</p>
				{ x.entity === 'Investment' && <StyledButton onClick={() => edit(x)} text='Editar' /> }
				{ x.entity === 'Investment' && <StyledButton onClick={() => remove(x)} text='Borrar' /> }
			</div>)
		})

	return <AuthorizedPage className='movimiento-body'>
		<NavBar title='Ingresos'/>
		{ details }
	</AuthorizedPage>
}
export default IncomeDetails
