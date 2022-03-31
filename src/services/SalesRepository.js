import {child, get, getDatabase, push, query, ref, set} from "firebase/database";
import {Timestamp} from "firebase/firestore";

class SalesRepository {
  saveSale(description, purchasePrice, salePrice) {
    const db = getDatabase();
    const key = push(child(ref(db), 'sales')).key
    set(ref(db, 'sales/' + key), {
      desc: description,
      purchase: Number.parseFloat(purchasePrice),
      sale: Number.parseFloat(salePrice),
      timestamp: Timestamp.now().toMillis()
    });
  }

  async getSales () {
    const db = getDatabase()
    const salesRef = query(ref(db, 'sales')) // TODO: Limit and order by timestamp ----, orderByChild('desc'), startAt(customStart ?? search), endAt(search+'\uf8ff'), limitToFirst(pageSize))
    const result = await get(salesRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }
}

export default SalesRepository;
