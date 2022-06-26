import NavBar from '../components/NavBar'
import AuthorizedPage from '../components/AuthorizedPage'
import { useNavigate, useParams } from 'react-router-dom'
import ProductsRepository from '../services/ProductsRepository'
import { useEffect, useState } from 'react'
import { dateFromMillis, mapValueTo } from '../utils/FormUtils'
import CompressedImageInput from '../components/CompressedImageInput'
import StyledButton from '../components/StyledButton'
import { Timestamp } from 'firebase/firestore'

function Product () {
	const navigate = useNavigate()
	const [description, setDescription] = useState('')
	const [purchasePrice, setPurchasePrice] = useState('')
	const [salePrice, setSalePrice] = useState('')
	const [quantity, setQuantity] = useState('')
	const [timestamp, setTimestamp] = useState(new Date().toISOString().split('T')[0])
	const [pictureFile, setPictureFile] = useState<Blob>()
	const repo = new ProductsRepository()
	const [loading, setLoading] = useState(false)

	const params = useParams()
	useEffect(() => {
		if (!params.id) { return }
		setLoading(true)
		repo.getProductById(params.id).then(doc => {
			setDescription(doc.desc)
			setPurchasePrice(doc.purchase.toString())
			setSalePrice(doc.sale.toString())
			setQuantity(doc.qt.toString())
			setTimestamp(dateFromMillis(doc.timestamp))
			setLoading(false)
		})
		// TODO: Download image
	}, [params])



	const save = () => {
		const dateToMillis = Timestamp.fromDate(new Date(timestamp)).toMillis()
		repo
			.saveProduct(description, purchasePrice, salePrice, quantity, pictureFile, params.id, dateToMillis)
			.then(()=> {
				navigate('/product/add/finished')
			})
	}

	return (<AuthorizedPage className='movimiento-body'>
		<NavBar title='Cargar Artículo'/>
		<form className='form-movimiento'>
			{ loading && <p>CARGANDO...</p> }
			<CompressedImageInput id='picture' setPictureFile={setPictureFile}/>
			<div className='row'>
				<label htmlFor='fecha'>Fecha</label>
				<input type='date' id='fecha' value={timestamp} onChange={ mapValueTo(setTimestamp) }/>
			</div>
			<div className='row'>
				<label htmlFor='description'>Descripci&oacute;n</label>
				<input type='text' id='description' value={description} onChange={ mapValueTo(setDescription) } />
			</div>
			<div className='row'>
				<label htmlFor='purchasePrice'>$ Compra</label>
				<input type='number' id='purchasePrice' value={purchasePrice} onChange={ mapValueTo(setPurchasePrice) }/>
			</div>
			<div className='row'>
				<label htmlFor='salePrice'>$ Venta</label>
				<input type='number' id='salePrice' value={salePrice} onChange={mapValueTo(setSalePrice)}/></div>

			<div className='row'>
				<label htmlFor='quantity'>Cantidad</label>
				<input type='number' id='quantity' value={quantity} onChange={ mapValueTo(setQuantity) }/>
			</div>

			<StyledButton onClick={save} text='Confirmar' />
		</form>

	</AuthorizedPage>)
}

export default Product
