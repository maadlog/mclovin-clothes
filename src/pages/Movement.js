import {useNavigate} from "react-router-dom";
import AuthorizedPage from "../components/AuthorizedPage";
import NavBar from "../components/NavBar";
import MovementsRepository from "../services/MovementsRepository";
import {useState} from "react";
import {mapValueTo} from "../utils/FormUtils";

function Movement () {
  const navigate = useNavigate()
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('spending')
  const finishMovement = () => {
    const repo = new MovementsRepository()
    if (type === 'spending') {
      repo.saveSpending(description, amount)
    } else {
      repo.saveInvestment(description, amount)
    }
    navigate('/movement/finished')
  }

  return (
    <AuthorizedPage>
      <NavBar title='Nuevo movimiento'/>
      <form>
        <label htmlFor='description'>Descripci&oacute;n</label>
        <input type='text' id='description' onChange={ mapValueTo(setDescription) }/>

        <label htmlFor='value'>Monto</label>
        <input type='number' id='value' onChange={ mapValueTo(setAmount) }/>

        <label htmlFor='type'>Tipo</label>
        <select id='type' onChange={ mapValueTo(setType) }>
          <option label='Gasto' value='spending' />
          <option label='Inversión' value='investment' />
        </select>

        <button onClick={ finishMovement }>Confirmar</button>
      </form>
      <div>
        <h2>Ayuda:</h2>
        <p> Algunos movimientos comunes: </p>
        <ul>
          <li>Alquiler: Cargar un gasto y si lo paga Martín o Mamá, una inversión</li>
          <li>Compras a Proveedores: Cargar una inversión con el total que pusimos, el gasto lo calcula solo cuando cargamos las prendas</li>
          <li>Yerba, Edenor, ABL, etc.: Todos gastos</li>
        </ul>
      </div>
    </AuthorizedPage>
  )
}

export default Movement;
