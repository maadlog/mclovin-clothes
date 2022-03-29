import './Home.css';
import {Link} from "react-router-dom";
import AuthorizedPage from "../components/AuthorizedPage";
import {getAuth} from "firebase/auth";

function Home() {
  return (
    <AuthorizedPage>
      <h1>Bienvenido!</h1>
      <button onClick={ () => { getAuth().signOut()} }>Salir</button>
      <hr/>
      <ul>
        <li><Link to='/sale'>Registrar Venta</Link></li>
        <li><Link to='/spending'>Gasto / Inversión</Link></li>
        <li><Link to='/stock'>Stock</Link></li>
        <li><Link to='/admin'>Administración</Link></li>
      </ul>
    </AuthorizedPage>
  );
}

export default Home;
