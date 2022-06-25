import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import MovementsRepository from '../services/MovementsRepository'
import SalesRepository from '../services/SalesRepository'
import { useEffect, useRef, useState } from 'react'
import ProductsRepository from '../services/ProductsRepository'
import StyledLink from '../components/StyledLink'
import { Spending } from '../types/Spending'
import { Investment } from '../types/Investment'
import { Sale } from '../types/Sale'
import { ProductPurchase } from '../types/ProductPurchase'
import StyledButton from '../components/StyledButton'
import { Product } from '../types/Product'

function Administration () {
	const [baseDate, setBaseDate] = useState(new Date())
	const ref = useRef<HTMLInputElement>(null)
	const [sales, setSales] = useState<Sale[]>([])
	const [spendings, setSpendings] = useState<Spending[]>([])
	const [investments, setInvestments] = useState<Investment[]>([])
	const [purchases, setPurchases] = useState<ProductPurchase[]>([])
	const [products, setProducts] = useState<Product[]>([])

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!baseDate) { return }
		setLoading(true)
		async function fetch () {
			const movementsRepo = new MovementsRepository()
			const salesRepo = new SalesRepository()
			const productsRepo = new ProductsRepository()
			setSales(await salesRepo.getSales())
			setSpendings(await movementsRepo.getSpendings())
			setInvestments(await movementsRepo.getInvestments())
			setPurchases(await productsRepo.getProductsPurchased())
			setProducts(await productsRepo.getProducts('', null, 2000))

			setLoading(false)
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

	const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
	const month = months[baseDate.getUTCMonth()]
	const year = baseDate.getUTCFullYear()

	return <AuthorizedPage className='movimiento-body'>
		<NavBar title='Administración' />

		<div className='periodo-container'>
			<h2>Per&iacute;odo : <span className='underlined' onClick={() => setShowDatePicker(!showDatePicker) }>{month} {year}</span></h2>
			<div style={{ display: showDatePicker ? 'flex' : 'none' }} className='search-container'>
				<input type='date' ref={ref} onChange={() => setShowSearch(true)}/>
				<button style={{ display: showSearch? 'flex' : 'none' }} className='search-button' onClick={ () => {
					if (!ref.current) { return }
					setBaseDate(new Date(ref.current.value))
					setShowSearch(false)
				}} >
					<span className='material-icons-round gris'>search</span>
				</button>
			</div>

		</div>

		<hr />

		<div className='balance'>
			<p>Caja: ${cashAvailable}</p>
			<p>Reinversi&oacute;n: ${reinvestment}</p>
			<p>Ganancia: ${earnings}</p>
		</div>

		<hr />

		<div className='balance'>
			<p>Ingresos: ${income}</p>
			<p>Inversiones: ${investmentsTotal}</p>
			<p>Ventas: ${salesTotal}</p>
			<StyledLink to={`/admin/income?baseDate=${baseDate.toISOString()}`} text='Detalles' />
		</div>

		<hr />

		<div className='balance'>
			<p>Egresos: ${expenses}</p>
			<p>Compras: ${purchasesTotal}</p>
			<p>Gastos: ${spendingsTotal}</p>
			<StyledLink to={`/admin/outcome?baseDate=${baseDate.toISOString()}`} text='Detalles' />
		</div>

		{ loading && <p>LOADING...</p>}
		<StyledButton text='Descargar DB' onClick={() => {
			const exported = { 
				sales,
				spendings,
				investments,
				purchases,
				products 
			}
			const text = JSON.stringify(exported)

			const element = document.createElement('a')
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
			element.setAttribute('download', 'db-'+baseDate.toISOString()+'.json')

			element.style.display = 'none'
			document.body.appendChild(element)

			element.click()

			document.body.removeChild(element)
		}}/>

	</AuthorizedPage>
}

export default Administration
