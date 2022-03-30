import {
  getDatabase,
  ref,
  set,
  query,
  limitToFirst,
  get,
  orderByChild,
  startAt,
  startAfter,
  endAt,
  push,
  child
} from "firebase/database";
import {Timestamp} from "firebase/firestore";

class ProductsRepository {
  saveProduct (description, purchasePrice, salePrice, quantity) {
    const db = getDatabase();
    const key = push(child(ref(db), 'products')).key
    set(ref(db, 'products/' + key), {
      desc: description,
      purchase: Number.parseFloat(purchasePrice),
      sale: Number.parseFloat(salePrice),
      qt: Number.parseInt(quantity),
      timestamp : Timestamp.now().toMillis()
    });
  }

  async getProducts (search, customStart = null, pageSize = 20) {
    const db = getDatabase()
    const productsRef = query(ref(db, 'products'), orderByChild('desc'), startAt(customStart ?? search), endAt(search+'\uf8ff'), limitToFirst(pageSize))
    const result = await get(productsRef)
    if (result.exists()) {
      console.log(result)
      const data = result.val()
      return Object.values(data) ?? []
    } else {
      return null
    }
  }
}

export default ProductsRepository
