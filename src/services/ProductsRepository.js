import {
  child,
  endAt,
  get,
  getDatabase,
  limitToFirst,
  orderByChild,
  push,
  query,
  ref,
  set,
  startAt,
  update
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

  setStock (productKey, quantity, desc) {
    const db = getDatabase();
    const qt = Math.max(quantity, 0)
    update(ref(db, 'products/' + productKey), { qt });
    if (qt === 0) {
      update(ref(db, 'products/' + productKey), { desc: '_VENDIDO_'+desc });
    }
  }

  async getProducts (search, customStart = null, pageSize = 20) {
    const db = getDatabase()
    const productsRef = query(ref(db, 'products'), orderByChild('desc'), startAt(customStart ?? search), endAt(search+'\uf8ff'), limitToFirst(pageSize))
    const result = await get(productsRef)
    if (result.exists()) {
      return Object.entries(result.val()).map(([key, value]) => {
        return {key, ...value}
      }) ?? []
    } else {
      return null
    }
  }
}

export default ProductsRepository
