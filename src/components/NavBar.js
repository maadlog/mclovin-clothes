import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";

function NavBar ({ title }) {

  return (<>
      <h1>{title}</h1>
      <Link to='/home'>Inicio</Link>
      <button onClick={ () => { getAuth().signOut()} }>Cerrar Sesi&oacute;n</button>
      <hr/>
    </>
  )
}

export default NavBar;
