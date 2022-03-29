import NavBar from "../components/NavBar";
import AuthorizedPage from "../components/AuthorizedPage";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Stock () {
  const originalData = [
    { description: 'coso1', stock: 1, salePrice: 100 },
    { description: 'coso2', stock: 3, salePrice: 300 },
    { description: 'coso3', stock: 8, salePrice: 600 },
    { description: 'coso4', stock: 2, salePrice: 300 },
    { description: 'coso5', stock: 1, salePrice: 700 },
  ]
  const [data, setData] = useState(originalData)
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()
  const add = () => {
    navigate('/product/add')
  }

  return (
    <AuthorizedPage>
      <NavBar title='Stock'/>
      <input type='search' onChange={ (event) => { setFilter(event.target.value) } }/>
      <button onClick={() => {
        setData(originalData.filter(x => x.description.includes(filter)))
      }} >Buscar</button>

      <ul>
        { data.map(item => <li key={item.description}>
          <p>{item.description}</p>
          <p>{item.stock} en Stock</p>
          <p>${item.salePrice}</p>
        </li>)}
      </ul>

      <button onClick={ add }>+</button>

    </AuthorizedPage>
  )
}

export default Stock;
