import { useEffect, useRef, useState } from 'react'
import ProductsRepository from '../services/ProductsRepository'
import PropTypes from 'prop-types'
import { ProductDisplay } from './ProductDisplay'

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
			{ data.map(item => <ProductDisplay key={item.desc} product={item} onClick={ () => onProductSelect(item) } />) }
		</ul>
	</>)
}

ProductSearch.propTypes = {
	onProductSelect: PropTypes.func
}

export default ProductSearch
