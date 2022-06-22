import AuthorizedPage from '../components/AuthorizedPage'
import NavBar from '../components/NavBar'
import StyledLink from '../components/StyledLink'

function Home() {
	return (
		<AuthorizedPage>
			<NavBar title='McLovin'/>
			<ul className="botonera-principal">
				<li><StyledLink to='/sale' text='Registrar Venta'/></li>
				<li><StyledLink to='/movement' text='Gasto / Inversión'/></li>
				<li><StyledLink to='/stock' text='Stock'/></li>
				<li><StyledLink to='/admin' text='Administración'/></li>
			</ul>
		</AuthorizedPage>
	)
}

export default Home
