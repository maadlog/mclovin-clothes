import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import MovementsRepository from '../services/MovementsRepository'
import SalesRepository from '../services/SalesRepository'
import { useEffect, useRef, useState } from 'react'
import ProductsRepository from '../services/ProductsRepository'

function Administration () {
	const [baseDate, setBaseDate] = useState(new Date())
	const ref = useRef(null)
	const [sales, setSales] = useState([])
	const [spendings, setSpendings] = useState([])
	const [investments, setInvestments] = useState([])
	const [purchases, setPurchases] = useState([])

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showSearch, setShowSearch] = useState(false)

	useEffect(() => {
		if (!baseDate) { return }
		async function fetch () {
			const movementsRepo = new MovementsRepository(baseDate)
			const salesRepo = new SalesRepository(baseDate)
			const productsRepo = new ProductsRepository(baseDate)
			setSales(await salesRepo.getSales())
			setSpendings(await movementsRepo.getSpendings())
			setInvestments(await movementsRepo.getInvestments())
			setPurchases(await productsRepo.getProductsPurchased())
		}
		fetch()
	}, [baseDate])

	const investmentsTotal = investments.reduce((p, x) => p + x.amount, 0)
	const salesTotal = sales.reduce((p, x) => p + x.sale, 0)
	const income = investmentsTotal + salesTotal

	const purchasesTotal = purchases.reduce((p, x) => p + x.amount, 0)
	const spendingsTotal = spendings.reduce((p, x) => p + x.amount, 0)
	const expenses = purchasesTotal + spendingsTotal

	const cashAvailable = income - expenses
	const reinvestment = sales.reduce((p, x) => p + x.purchase, 0)
	const earnings = cashAvailable - reinvestment

	const month = baseDate.toLocaleString('default', { month: 'short' })
	const year = baseDate.toLocaleString('default', { year: 'numeric' })

	return <AuthorizedPage>
		<NavBar title='Administración' />

		<div>
			<h2>Per&iacute;odo : <span className='underlined' onClick={() => setShowDatePicker(!showDatePicker) }>{month} {year}</span></h2>
			<div style={{ display: showDatePicker ? 'flex' : 'none' }}>
				<input type='date' ref={ref} onChange={() => setShowSearch(true)}/>
				<button style={{ display: showSearch? 'flex' : 'none' }} className='search-button' onClick={ () => {
					setBaseDate(new Date(ref.current.value))
					setShowSearch(false)
				}} >
					<span className='material-icons-round gris'>search</span>
				</button>
			</div>

		</div>
		<div>
			<p>Caja: ${cashAvailable}</p>
			<p>Reinversi&oacute;n: ${reinvestment}</p>
			<p>Ganancia: ${earnings}</p>
		</div>

		<hr />

		<div>
			<p>Ingresos: ${income}</p>
			<p>Inversiones: ${investmentsTotal}</p>
			<p>Ventas: ${salesTotal}</p>
			<Link to={`/admin/income?baseDate=${baseDate.toISOString()}`}>Detalles</Link>
		</div>

		<hr />

		<div>
			<p>Egresos: ${expenses}</p>
			<p>Compras: ${purchasesTotal}</p>
			<p>Gastos: ${spendingsTotal}</p>
			<Link to={`/admin/outcome?baseDate=${baseDate.toISOString()}`}>Detalles</Link>
		</div>

	</AuthorizedPage>
}

export default Administration
