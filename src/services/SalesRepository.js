import {child, get, push, query, ref, set} from "firebase/database";
import {Timestamp} from "firebase/firestore";
import BaseRepository from "./BaseRepository";

class SalesRepository extends BaseRepository {
  saveSale(description, purchasePrice, salePrice) {
    const key = push(child(ref(this.db), this.base + '/sales')).key
    set(ref(this.db, this.base + '/sales/' + key), {
      desc: description,
      purchase: Number.parseFloat(purchasePrice),
      sale: Number.parseFloat(salePrice),
      timestamp: Timestamp.now().toMillis()
    });
  }

  async getSales () {
    const salesRef = query(ref(this.db, this.base + '/sales'))
    const result = await get(salesRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }
}

export default SalesRepository;
