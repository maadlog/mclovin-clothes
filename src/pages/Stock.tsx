import NavBar from '../components/NavBar'
import AuthorizedPage from '../components/AuthorizedPage'
import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsRepository from '../services/ProductsRepository'
import { ProductDisplay } from '../components/ProductDisplay'
import { debounce } from 'lodash'
import StyledButton from '../components/StyledButton'
import { Product } from '../types/Product'

export default function Stock () {
	const [data, setData] = useState<Product[]>([])
	const [filter, setFilter] = useState('')
	const searchElement = useRef(null)
	const navigate = useNavigate()
	const add = () => {
		navigate('/product/add')
	}

	useEffect(() => {
		if (filter) {
			new ProductsRepository().getProducts(filter === '*' ? '' : filter).then(setData)
		}
	}, [filter])

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
		setFilter(event.target.value)
	}

	const debouncedChangeHandler = useMemo(
		() => debounce(changeHandler, 300)
		, [])

	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel()
		}
	}, [])


	return (
		<AuthorizedPage className='movimiento-body'>
			<NavBar title='Stock'/>
			<div className='search-bar width-limit-content'>
				<input type='search' ref={searchElement} placeholder={'Buscar ( * para ver todos )'} onChange={debouncedChangeHandler}/>
			</div>

			<div className='width-limit-content'>
				<StyledButton className='add-button-desktop' text='Agregar' icon='add' onClick={add} />
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
