import AuthorizedPage from '../components/AuthorizedPage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import ProductSearch from '../components/ProductSearch'
import SalesRepository from '../services/SalesRepository'
import { mapValueTo } from '../utils/FormUtils'
import ProductsRepository from '../services/ProductsRepository'
import PropTypes from 'prop-types'
import { ProductDisplayWithStock } from '../components/ProductDisplay'


function Cart ({ items, removeItem }) {
	const [products, setProducts] = useState({})
	const [manualSubtotal, setSubtotal] = useState(null)
	const navigate = useNavigate()
	const finishSale = () => {
		if (items.length === 0) { return }
		const description = items.reduce((prev, item) => {
			return prev + `${item.desc}*${products[item.desc] ?? 1} `
		}, '')
		const purchasePrice = items.reduce((prev, item) => {
			return prev + (item.purchase * (products[item.desc] ?? 1))
		}, 0)
		const salePrice = manualSubtotal ?? items.reduce((prev, item) => {
			return prev + (item.sale * (products[item.desc] ?? 1))
		}, 0)
		new SalesRepository().saveSale(description, purchasePrice, salePrice)
		const productsRepo = new ProductsRepository()
		for (const item of items) {
			const newStock = item.qt - (products[item.desc] ?? 1)
			productsRepo.setStock(item.id, newStock, item.desc)
		}
		navigate('/sale/finished')
	}

	const onChange = (itemDesc, value) => {
		if (value <= 0) {
			removeItem(itemDesc)
			return
		}
		setProducts({ ...products, [itemDesc]: value })
	}

	const itemDisplays = items
		.map( (item) => (
			<ProductDisplayWithStock key={item.desc} product={item} stock={products[item.desc] ?? 1} onChange={ onChange }/>
		))

	const subtotal = items.map((item) => item.sale * (products[item.desc] ?? 1)).reduce((a, b) => a + b, 0)

	return (
		<div className='cart-container width-limit-content'>
			<ul className='cart-list'>{itemDisplays}</ul>
			<div className='subtotal'>
				<p>Subtotal</p>
				<input type='number' placeholder={subtotal} onChange={ mapValueTo((x) => setSubtotal(Number.parseFloat(x))) } />
			</div>
			<button className='confirmar-button' onClick={ finishSale }>Confirmar</button>
		</div>
	)
}
Cart.propTypes = {
	items: PropTypes.array,
	removeItem: PropTypes.func
}


function Sale() {
	const [cart, setCart] = useState(() => [])

	return (
		<AuthorizedPage className='movimiento-body'>
			<NavBar title='Changuito'/>
			<main className='sale-main'>
				<ProductSearch
					onProductSelect={ (product) => {
						if (product.qt <= 0 || cart.some(x => x.desc === product.desc)) { return }
						setCart(cart.concat(product))
					}}
				/>
				<Cart items={ cart } removeItem={ (itemDesc) => {
					setCart(prev => prev.filter(x => x.desc !== itemDesc))
				}  }/>
			</main>
		</AuthorizedPage>
	)
}

export default Sale
