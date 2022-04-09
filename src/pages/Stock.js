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
		new ProductsRepository().getProducts(filter).then(setData)
	}, [filter])

	return (
		<AuthorizedPage className='movimiento-body'>
			<NavBar title='Stock'/>
			<div className='search-bar width-limit-content'>
				<input type='search' ref={searchElement} placeholder={'Buscar'}/>
				<button className='icon-button search-button' onClick={ () => {
					setFilter(searchElement.current.value)
				}} >
					<span className='material-icons-round gris'>search</span>
				</button>
			</div>

			<div className='width-limit-content'>
				<button className='add-button-desktop' onClick={ add }>
					<span className='material-icons-round gris'>add</span> Agregar
				</button>
			</div>

			<ul className='product-list width-limit-content'>
				{ data.map(item => <ProductDisplay key={item.desc} product={item} />) }
			</ul>

			<button className='icon-button add-button' onClick={ add }>
				<span className='material-icons-round gris'>add</span>
			</button>

		</AuthorizedPage>
	)
}
