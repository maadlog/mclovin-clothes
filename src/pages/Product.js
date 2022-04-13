import NavBar from '../components/NavBar'
import AuthorizedPage from '../components/AuthorizedPage'
import { useNavigate } from 'react-router-dom'
import ProductsRepository from '../services/ProductsRepository'
import { useState } from 'react'
import { mapValueTo } from '../utils/FormUtils'
import CompressedImageInput from '../components/CompressedImageInput'
import StyledButton from '../components/StyledButton'

function Product () {
	const navigate = useNavigate()
	const [description, setDescription] = useState('')
	const [purchasePrice, setPurchasePrice] = useState('')
	const [salePrice, setSalePrice] = useState('')
	const [quantity, setQuantity] = useState('')
	const [pictureFile, setPictureFile] = useState(null)

	const save = (event) => {
		event.preventDefault()
		new ProductsRepository()
			.saveProduct(description, purchasePrice, salePrice, quantity, pictureFile)
			.then(()=> {
				navigate('/product/add/finished')
			})
	}

	return (<AuthorizedPage className='movimiento-body'>
		<NavBar title='Cargar Artículo'/>
		<form className='form-movimiento'>
			<CompressedImageInput id='picture' setPictureFile={setPictureFile}/>

			<div className='row'>
				<label htmlFor='description'>Descripci&oacute;n</label>
				<input type='text' id='description' onChange={ mapValueTo(setDescription) } />
			</div>
			<div className='row'>
				<label htmlFor='purchasePrice'>$ Compra</label>
				<input type='number' id='purchasePrice' onChange={ mapValueTo(setPurchasePrice) }/>
			</div>
			<div className='row'>
				<label htmlFor='salePrice'>$ Venta</label>
				<input type='number' id='salePrice' onChange={mapValueTo(setSalePrice)}/></div>

			<div className='row'>
				<label htmlFor='quantity'>Cantidad</label>
				<input type='number' id='quantity' onChange={ mapValueTo(setQuantity) }/>
			</div>

			<StyledButton onClick={save} text='Confirmar' />
		</form>

	</AuthorizedPage>)
}

export default Product
