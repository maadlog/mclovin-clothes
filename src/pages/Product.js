import NavBar from "../components/NavBar";
import AuthorizedPage from "../components/AuthorizedPage";
import {useNavigate} from "react-router-dom";

function Product () {
  const navigate = useNavigate()
  const save = () => {
    navigate('/product/add/finished')
  }

  return (<AuthorizedPage>
    <NavBar title='Cargar Artículo'/>
    <form>
      <label htmlFor='description'>Descripci&oacute;n</label>
      <input type='text' id='description'/>

      <label htmlFor='purchasePrice'>Precio Compra</label>
      <input type='number' id='purchasePrice'/>

      <label htmlFor='salePrice'>Precio Venta</label>
      <input type='number' id='salePrice'/>

      <button onClick={ save }>Confirmar</button>
    </form>

  </AuthorizedPage>)
}

export default Product;
