import { useEffect, useState } from 'react'
import ProductsRepository from '../services/ProductsRepository'
import PropTypes from 'prop-types'
import { Product } from '../types/Product'

interface ProductDisplayWithStockProps {
	product: Product
	stock: number
	onChange: (productDesc: string, stock: number) => void
}
export function ProductDisplayWithStock({ product, stock, onChange }: ProductDisplayWithStockProps) {
	const [imgUrl, setImage] = useState('favicon.ico')
	useEffect(() => {
		new ProductsRepository()
			.getPictureUrl(product.id)
			.then(setImage)
			.catch(() => { console.log('Failed loading picture for '+product.id)})
	}, [product])

	return <li className='product-display'>
		<img src={imgUrl} alt={'Foto de ' + product.desc} width={100} height={100}/>
		<div className='data'>
			<p className='bold'>{product.desc}</p>
			<p>{product.qt} en Stock</p>
		</div>
		<div className='product-price-details'>
			<p className='bold price'>${product.sale}</p>
			<div className='stock-controls'>
				<button onClick={ () => {
					onChange(product.desc, stock - 1)
				} }>-</button>
				<p>{stock}</p>
				<button disabled={stock >= product.qt} onClick={ () => {
					onChange(product.desc, stock + 1)
				} }>+</button>
			</div>
		</div>
	</li>
}

interface ProductDisplayProps {
	product: Product
	onClick?: () => void
}
export function ProductDisplay({ product, onClick }: ProductDisplayProps) {
	const [imgUrl, setImage] = useState('favicon.ico')
	useEffect(() => {
		new ProductsRepository()
			.getPictureUrl(product.id)
			.then(setImage)
			.catch(() => { console.log('Failed loading picture for '+product.id)})
	}, [product])

	return <li className='product-display' onClick={() => { onClick && onClick() }}>
		<img src={imgUrl} alt={'Foto de ' + product.desc} width={75} height={75}/>
		<div className='data'>
			<p className='bold'>{product.desc}</p>
			<p>{product.qt} en Stock</p>
		</div>
		<p className='bold'>${product.sale}</p>
	</li>
}

ProductDisplay.propTypes = {
	product: PropTypes.object,
	onClick: PropTypes.func
}

ProductDisplayWithStock.propTypes = {
	product: PropTypes.object,
	stock: PropTypes.number,
	onChange: PropTypes.func
}
