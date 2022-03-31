import {child, getDatabase, push, ref, set} from "firebase/database";
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
}

export default SalesRepository;
