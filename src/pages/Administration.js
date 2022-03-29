import AuthorizedPage from "../components/AuthorizedPage";
import NavBar from "../components/NavBar";
import {Link} from "react-router-dom";


function Administration () {

  return <AuthorizedPage>
    <NavBar title='Administración' />

    <div>
      <p>Caja: $1000</p>
      <p>Reinversión: $500</p>
      <p>Ganancia: $500</p>
    </div>

    <hr />

    <div>
      <p>Ingresos: $1000</p>
      <p>Inversiones: $500</p>
      <p>Ventas: $500</p>
      <Link to='/admin/income'>Detalles</Link>
    </div>

    <hr />

    <div>
      <p>Egresos: $1000</p>
      <p>Compras: $500</p>
      <p>Gastos: $500</p>
      <Link to='/admin/outcome'>Detalles</Link>
    </div>



  </AuthorizedPage>
}

export default Administration;
