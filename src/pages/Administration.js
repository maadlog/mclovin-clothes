import AuthorizedPage from "../components/AuthorizedPage";
import NavBar from "../components/NavBar";
import {Link} from "react-router-dom";
import MovementsRepository from "../services/MovementsRepository";
import SalesRepository from "../services/SalesRepository";
import {useEffect, useState} from "react";
import ProductsRepository from "../services/ProductsRepository";


function Administration () {
  const [sales, setSales] = useState([])
  const [spendings, setSpendings] = useState([])
  const [investments, setInvestments] = useState([])
  const [stock, setStock] = useState([])

  useEffect(() => {
    async function fetch () {
      const movementsRepo = new MovementsRepository()
      const salesRepo = new SalesRepository()
      const productsRepo = new ProductsRepository()
      setSales(await salesRepo.getSales())
      setSpendings(await movementsRepo.getSpendings())
      setInvestments(await movementsRepo.getInvestments())
      setStock(await productsRepo.getProductsPurchased())
    }
    fetch()
  }, [])

  const investmentsTotal = investments.reduce((p, x) => p + x.amount, 0)
  const salesTotal = sales.reduce((p, x) => p + x.sale, 0)
  const income = investmentsTotal + salesTotal

  const purchases = stock.reduce((p, x) => p + (x.purchase * x.qt), 0)
  const spendingsTotal = spendings.reduce((p, x) => p + x.amount, 0)
  const outcome = purchases + spendingsTotal

  const register = income - outcome
  const reinvestment = sales.reduce((p, x) => p + x.purchase, 0)
  const earnings = register - reinvestment

  return <AuthorizedPage>
    <NavBar title='Administración' />

    <div>
      <p>Caja: ${register}</p>
      <p>Reinversión: ${reinvestment}</p>
      <p>Ganancia: ${earnings}</p>
    </div>

    <hr />

    <div>
      <p>Ingresos: ${income}</p>
      <p>Inversiones: ${investmentsTotal}</p>
      <p>Ventas: ${salesTotal}</p>
      <Link to='/admin/income'>Detalles</Link>
    </div>

    <hr />

    <div>
      <p>Egresos: ${outcome}</p>
      <p>Compras: ${purchases}</p>
      <p>Gastos: ${spendingsTotal}</p>
      <Link to='/admin/outcome'>Detalles</Link>
    </div>



  </AuthorizedPage>
}

export default Administration;
