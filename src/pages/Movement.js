import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import AuthorizedPage from "../components/AuthorizedPage";

function Movement () {
  const navigate = useNavigate()
  const finishMovement = () => {
    navigate('/movement/finished')
  }

  return (
    <AuthorizedPage>
      <h1>Nuevo movimiento</h1>
      <button onClick={ () => { getAuth().signOut()} }>Salir</button>
      <hr/>
      <form>
        <label htmlFor='description'>Descripci&oacute;n</label>
        <input type='text' id='description'/>

        <label htmlFor='value'>Monto</label>
        <input type='number' id='value'/>

        <label htmlFor='type'>Tipo</label>
        <select id='type'>
          <option label='Gasto' value='spending' />
          <option label='Inversión' value='investment' />
        </select>

        <button onClick={ finishMovement }>Confirmar</button>
      </form>
    </AuthorizedPage>
  )
}

export default Movement;
