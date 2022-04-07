import { Link } from 'react-router-dom'
import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'

function Home() {
	return (
		<AuthorizedPage>
			<NavBar title='McLovin'/>
			<ul className="botonera-principal">
				<li><Link to='/sale'>Registrar Venta</Link></li>
				<li><Link to='/movement'>Gasto / Inversión</Link></li>
				<li><Link to='/stock'>Stock</Link></li>
				<li><Link to='/admin'>Administración</Link></li>
			</ul>
		</AuthorizedPage>
	)
}

export default Home
