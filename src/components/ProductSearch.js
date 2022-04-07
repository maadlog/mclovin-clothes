import { useEffect, useRef, useState } from 'react'
import ProductsRepository from '../services/ProductsRepository'
import PropTypes from 'prop-types'

function ProductSearch({ onProductSelect }) {
	const [data, setData] = useState([])
	const [filter, setFilter] = useState('')
	const searchElement = useRef(null)

	useEffect(() => {
		async function fetchProducts() {
			const products = await new ProductsRepository().getProducts(filter)
			setData(products)
		}
		fetchProducts()
	}, [filter])

	return (<>
		<input type='search' ref={searchElement}/>
		<button onClick={() => {
			setFilter(searchElement.current.value)
		}} >Buscar</button>

		<ul>
			{ data.map(item => <li key={item.desc} onClick={ () => onProductSelect(item) }>
				<p>{item.desc}</p>
				<p>{item.qt} en Stock</p>
				<p>${item.sale}</p>
			</li>)}
		</ul>
	</>)
}

ProductSearch.propTypes = {
	onProductSelect: PropTypes.func
}

export default ProductSearch
