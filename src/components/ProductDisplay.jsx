import { useEffect, useState } from 'react'
import ProductsRepository from '../services/ProductsRepository'
import PropTypes from 'prop-types'

export function ProductDisplay({ product }) {
	const [imgUrl, setImage] = useState('favicon.ico')
	useEffect(() => {
		new ProductsRepository()
			.getPictureUrl(product.id)
			.then(setImage)
			.catch(() => { console.log('Failed loading picture for '+product.id)})
	}, [product])

	return <li>
		<img src={imgUrl} alt={'Foto de ' + product.desc} width={100} height={100}/>
		<p>{product.desc}</p>
		<p>{product.qt} en Stock</p>
		<p>${product.sale}</p>
	</li>
}

ProductDisplay.propTypes = {
	product: PropTypes.object
}
