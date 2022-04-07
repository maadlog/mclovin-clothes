import NavBar from '../components/NavBar'
import AuthorizedPage from '../components/AuthorizedPage'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsRepository from '../services/ProductsRepository'
import { ProductDisplay } from '../components/ProductDisplay'

export default function Stock () {
	const [data, setData] = useState([])
	const [filter, setFilter] = useState('')
	const searchElement = useRef(null)
	const navigate = useNavigate()
	const add = () => {
		navigate('/product/add')
	}

	useEffect(() => {
		async function fetchProducts() {
			const products = await new ProductsRepository().getProducts(filter)
			setData(products)
		}
		fetchProducts()
	}, [filter])

	return (
		<AuthorizedPage>
			<NavBar title='Stock'/>
			<input type='search' ref={searchElement}/>
			<button onClick={() => {
				setFilter(searchElement.current.value)
			}} >Buscar</button>

			<ul>
				{ data.map(item => <ProductDisplay key={item.desc} product={item} />) }
			</ul>

			<button onClick={ add }>+</button>

		</AuthorizedPage>
	)
}
