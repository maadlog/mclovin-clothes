import NavBar from '../components/NavBar'
import AuthorizedPage from '../components/AuthorizedPage'
import { useNavigate } from 'react-router-dom'
import ProductsRepository from '../services/ProductsRepository'
import { useState } from 'react'
import { mapValueTo } from '../utils/FormUtils'

function Product () {
	const navigate = useNavigate()
	const [description, setDescription] = useState('')
	const [purchasePrice, setPurchasePrice] = useState('')
	const [salePrice, setSalePrice] = useState('')
	const [quantity, setQuantity] = useState('')
	const save = () => {
		new ProductsRepository()
			.saveProduct(description, purchasePrice, salePrice, quantity)
		navigate('/product/add/finished')
	}

	return (<AuthorizedPage>
		<NavBar title='Cargar Artículo'/>
		<form>
			<label htmlFor='description'>Descripci&oacute;n</label>
			<input type='text' id='description' onChange={ mapValueTo(setDescription) }/>

			<label htmlFor='purchasePrice'>Precio Compra</label>
			<input type='number' id='purchasePrice' onChange={ mapValueTo(setPurchasePrice) }/>

			<label htmlFor='salePrice'>Precio Venta</label>
			<input type='number' id='salePrice' onChange={ mapValueTo(setSalePrice) }/>

			<label htmlFor='quantity'>Cantidad</label>
			<input type='number' id='quantity' onChange={ mapValueTo(setQuantity) }/>

			<button onClick={ save }>Confirmar</button>
		</form>

	</AuthorizedPage>)
}

export default Product
