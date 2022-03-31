import AuthorizedPage from "../components/AuthorizedPage";
import {useState} from "react";
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar";
import ProductSearch from "../components/ProductSearch";
import SalesRepository from "../services/SalesRepository";
import {mapValueTo} from "../utils/FormUtils";
import ProductsRepository from "../services/ProductsRepository";

function ItemDisplay ({ name, qt, stock, price, onChange }) {
  return (
    <li>
      <p>Item: {name} - {qt} * ${price}</p>
      <button disabled={qt >= stock} onClick={ () => {
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
  const [manualSubtotal, setSubtotal] = useState(null)
  const navigate = useNavigate()
  const finishSale = () => {
    if (items.length === 0) { return }
    const description = items.reduce((prev, item) => {
      return prev + `${item.desc}*${values[item.desc] ?? 1} `
    }, '')
    const purchasePrice = items.reduce((prev, item) => {
      return prev + (item.purchase * (values[item.desc] ?? 1))
    }, 0)
    const salePrice = manualSubtotal ?? items.reduce((prev, item) => {
      return prev + (item.sale * (values[item.desc] ?? 1))
    }, 0)
    new SalesRepository().saveSale(description, purchasePrice, salePrice)
    const productsRepo = new ProductsRepository()
    for (const item of items) {
      const newStock = item.qt - (values[item.desc] ?? 1)
      productsRepo.setStock(item.key, newStock, item.desc)
    }
    navigate('/sale/finished')
  }

  const onChange = (itemDesc, value) => {
    if (value <= 0) {
      removeItem(itemDesc)
      return
    }
    setValues({ ...values, [itemDesc]: value })
  }

  const itemDisplays = items
    .map( (item) => (
    <ItemDisplay key={item.desc} name={item.desc} price={item.sale} qt={values[item.desc] ?? 1} stock={item.qt} onChange={ onChange }/>
  ))

  const subtotal = items.map((item) => item.sale * (values[item.desc] ?? 1)).reduce((a, b) => a + b, 0)

  return (
    <>
      <ul>{itemDisplays}</ul>
      <p>Subtotal</p><input type='number' placeholder={subtotal} onChange={ mapValueTo((x) => setSubtotal(Number.parseFloat(x))) } />
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
          <ProductSearch onProductSelect={ (product) => {
            if (product.qt <= 0 || cart.some(x => x.desc === product.desc)) { return }
            setCart(cart.concat(product))
          }} />

        <Cart items={ cart } removeItem={ (itemDesc) => {
          setCart(prev => prev.filter(x => x.desc !== itemDesc))
        }  }/>
      </div>
    </AuthorizedPage>
  );
}

export default Sale;
