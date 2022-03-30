import {useNavigate} from "react-router-dom";
import AuthorizedPage from "../components/AuthorizedPage";
import NavBar from "../components/NavBar";
import MovementsRepository from "../services/MovementsRepository";
import {useState} from "react";

function Movement () {

  const mapValueTo = (fn) => {
    return (event) => {
      return fn(event.target.value)
    }
  }

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
    </AuthorizedPage>
  )
}

export default Movement;
