import {
  child,
  endAt,
  get,
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
import BaseRepository from "./BaseRepository";

class ProductsRepository extends BaseRepository {
  saveProduct (description, purchasePrice, salePrice, quantity) {
    const key = push(child(ref(this.db), this.base + '/products')).key
    set(ref(this.db, this.base + '/products/' + key), {
      desc: description,
      purchase: Number.parseFloat(purchasePrice),
      sale: Number.parseFloat(salePrice),
      qt: Number.parseInt(quantity),
      timestamp : Timestamp.now().toMillis()
    });
  }

  setStock (productKey, quantity, desc) {
    const qt = Math.max(quantity, 0)
    const updates = { qt }
    if (qt === 0) {
      updates.desc = '_VENDIDO_'+desc
    }
    update(ref(this.db, this.base + '/products/' + productKey), updates);
  }

  async getProducts (search, customStart = null, pageSize = 20) {
    const productsRef = query(ref(this.db, this.base + '/products'), orderByChild('desc'), startAt(customStart ?? search), endAt(search+'\uf8ff'), limitToFirst(pageSize))
    const result = await get(productsRef)
    if (result.exists()) {
      return Object.entries(result.val()).map(([key, value]) => {
        return {key, ...value}
      }) ?? []
    } else {
      return []
    }
  }

  async getProductsPurchased () {
    const productsRef = query(ref(this.db, this.base + '/products'))
    const result = await get(productsRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }

}

export default ProductsRepository
