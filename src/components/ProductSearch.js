import { useEffect, useRef, useState, useMemo } from 'react'
import ProductsRepository from '../services/ProductsRepository'
import PropTypes from 'prop-types'
import { ProductDisplay } from './ProductDisplay'
import debounce from 'lodash.debounce'

function ProductSearch({ onProductSelect }) {
	const [data, setData] = useState([])
	const [filter, setFilter] = useState('')
	const [showResults, setShowResults] = useState(false)

	useEffect(() => {
		if (filter) {
			new ProductsRepository().getProducts(filter === '*' ? '' : filter).then(setData)
		}
	}, [filter])

	const changeHandler = (event) => {
		setFilter(event.target.value)
	}

	const debouncedChangeHandler = useMemo(
		() => debounce(changeHandler, 300)
		, [])

	// Stop the invocation of the debounced function
	// after unmounting
	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel()
		}
	}, [])

	return (
		<div className='search-bar width-limit-content'>
			<input type='search' placeholder={'Buscar ( * para ver todos )'} onChange={debouncedChangeHandler} onFocus={() => setShowResults(true)}/>
			{ showResults &&
				<div className='product-search-results-container'>
					{ data.length > 0 && <div className='expand-less'><span className='material-icons-round gris' onClick={() => setShowResults(false) }>expand_less</span></div> }
					<ul className={ 'product-list product-search-results'}>
						{ data.map(item => <ProductDisplay key={item.desc} product={item} onClick={ () => {
							setShowResults(false)
							onProductSelect(item)
						}} />) }
					</ul>
				</div>
			}
		</div>
	)
}

ProductSearch.propTypes = {
	onProductSelect: PropTypes.func
}

export default ProductSearch
