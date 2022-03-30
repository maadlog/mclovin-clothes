import NavBar from "../components/NavBar";
import AuthorizedPage from "../components/AuthorizedPage";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProductsRepository from "../services/ProductsRepository";

function Stock () {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const searchElement = useRef(null);
  const navigate = useNavigate()
  const add = () => {
    navigate('/product/add')
  }

  useEffect(() => {
    async function fetchProducts() {
      const products = await new ProductsRepository().getProducts(filter)
      setData(products)
    }
    fetchProducts()
  }, [filter])

  return (
    <AuthorizedPage>
      <NavBar title='Stock'/>
      <input type='search' ref={searchElement}/>
      <button onClick={() => {
        setFilter(searchElement.current.value)
      }} >Buscar</button>

      <ul>
        { data.map(item => <li key={item.desc}>
          <p>{item.desc}</p>
          <p>{item.qt} en Stock</p>
          <p>${item.sale}</p>
        </li>)}
      </ul>

      <button onClick={ add }>+</button>

    </AuthorizedPage>
  )
}

export default Stock;
