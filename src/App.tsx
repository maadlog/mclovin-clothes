import React, { useState } from 'react'
import {
	BrowserRouter,
	Routes,
	Route, Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import Sale from './pages/Sale'
import Movement from './pages/Movement'
import FinishedLayout from './components/FinishedLayout'
import Stock from './pages/Stock'
import Product from './pages/Product'
import Administration from './pages/Administration'
import IncomeDetails from './pages/IncomeDetails'
import OutcomeDetails from './pages/OutcomeDetails'
import DeleteConfirmationLayout from './components/DeleteConfirmationLayout'
import MovementsRepository from './services/MovementsRepository'
import ProductsRepository from './services/ProductsRepository'

export default function App() {
	const auth = getAuth()
	const [user, setUser] = useState<User| null>(null)
	const [loading, setLoading] = useState(true)
	onAuthStateChanged(auth, (firebaseUser) => {
		setUser(firebaseUser)
		setLoading(false)
	})

	if (loading) return (<p>Loading...</p>)
	const loginOrRedirection = user ? <Navigate to="/home" /> : <Login />
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route path='/' element={loginOrRedirection} />
					<Route path='/login' element={loginOrRedirection} />
					<Route path='/home' element={<Home/>} />
					<Route path='/sale' element={<Sale/>} />
					<Route path='/sale/finished' element={
						<FinishedLayout barTitle='Changuito!' title='Venta Cargada' backUrl='/sale' backText='Cargar otra Venta'/>
					}/>
					<Route path='/movement' element={<Movement/>} />
					<Route path='/movement/:type/:id' element={<Movement/>} />
					<Route path='/movement/investment/:id/delete' element={
						<DeleteConfirmationLayout denomination='la inversión' deleteCallback={(id) => new MovementsRepository().deleteInvestment(id)} />
					} />
					<Route path='/movement/spending/:id/delete' element={
						<DeleteConfirmationLayout denomination='el gasto' deleteCallback={(id) => new MovementsRepository().deleteSpending(id)} />
					} />
					<Route path='/movement/finished' element={
						<FinishedLayout barTitle='Movimiento!' title='Movimiento Cargado' backUrl='/movement' backText='Cargar otro movimiento'/>
					}/>
					<Route path='/stock' element={<Stock />} />
					<Route path='/product' element={<Product />} />
					<Route path='/product/:id' element={<Product />} />
					<Route path='/product/:id/delete' element={
						<DeleteConfirmationLayout denomination='el producto' deleteCallback={(id) => new ProductsRepository().delete(id)} />
					} />
					<Route path='/product/finished' element={
						<FinishedLayout barTitle='Cargar articulo!' title='Articulo Cargado' backUrl='/product/add' backText='Cargar otro artículo'/>
					}/>
					<Route path='/admin' element={<Administration />} />
					<Route path='/admin/income' element={<IncomeDetails />} />
					<Route path='/admin/outcome' element={<OutcomeDetails />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}
