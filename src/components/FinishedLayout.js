import AuthorizedPage from "./AuthorizedPage";
import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";

function FinishedLayout({ barTitle, title, backUrl, backText }) {
  return (
    <AuthorizedPage>
      <h1>{ barTitle }</h1>
      <button onClick={ () => { getAuth().signOut()} }>Salir</button>
      <hr/>

      <h2>{ title }</h2>
      <ul>
        <li><Link to={ backUrl }>{ backText }</Link></li>
        <li><Link to='/home'>Volver al inicio</Link></li>
      </ul>
    </AuthorizedPage>
  );
}

export default FinishedLayout;
