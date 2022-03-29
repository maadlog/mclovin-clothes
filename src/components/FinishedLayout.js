import AuthorizedPage from "./AuthorizedPage";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

function FinishedLayout({ barTitle, title, backUrl, backText }) {
  return (
    <AuthorizedPage>
      <NavBar title={ barTitle }/>
      <h2>{ title }</h2>
      <ul>
        <li><Link to={ backUrl }>{ backText }</Link></li>
        <li><Link to='/home'>Volver al inicio</Link></li>
      </ul>
    </AuthorizedPage>
  );
}

export default FinishedLayout;
