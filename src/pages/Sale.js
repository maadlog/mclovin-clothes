import AuthorizedPage from "../components/AuthorizedPage";
import {useState} from "react";
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar";

function ItemDisplay ({ name, qt = 1, onChange }) {
  return (
    <li key={`${name}${qt}`}>Item: {name} - {qt}
      <button onClick={ () => {
        onChange(name, qt + 1)
      } }>+</button>
      <button onClick={ () => {
        onChange(name, qt - 1)
      } }>-</button>
    </li>
  )
}


function Cart ({ items, removeItem }) {
  const [values, setValues] = useState({})
  const navigate = useNavigate()
  const finishSale = () => {
    navigate('/sale/finished')
  }

  const onChange = (item, value) => {
    if (value <= 0) {
      removeItem(item)
    }
    setValues({ ...values, [item]: value })
  }

  const itemDisplays = items
    .map( (item) => (
    <ItemDisplay name={item} qt={values[item]} onChange={ onChange }/>
  ))

  return (
    <>
      <ul>{itemDisplays}</ul>
      <p>Subtotal</p><input type='number' placeholder={1000} />
      <button onClick={ finishSale }>Hecho</button>
    </>
  )
}


function Sale() {
  const [cart, setCart] = useState(() => []);

  return (
    <AuthorizedPage>
      <NavBar title='Changuito'/>
      <div>
          <input type='search'/>
        <button onClick={() => {
          setCart(cart.concat('Coso'+ Math.random() * 1000))
        }} >Buscar</button>

        <p>{JSON.stringify(cart)}</p>
        <Cart items={ cart } removeItem={ (item) => {
          setCart(prev => prev.filter(x => x !== item))
        }  }/>
      </div>
    </AuthorizedPage>
  );
}

export default Sale;
