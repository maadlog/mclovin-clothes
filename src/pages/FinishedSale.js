import AuthorizedPage from "../components/AuthorizedPage";
import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";

function FinishedSale() {

  return (
    <AuthorizedPage>
      <h1>Changuito!</h1>
      <button onClick={ () => { getAuth().signOut()} }>Salir</button>
      <hr/>

      <h2>Venta Cargada</h2>
      <ul>
        <li><Link to='/sale'>Cargar otra Venta</Link></li>
        <li><Link to='/home'>Volver al inicio</Link></li>
      </ul>
    </AuthorizedPage>
  );
}

export default FinishedSale;
