import {
  getDatabase,
  ref,
  set,
  push,
  child,
  query,
  orderByChild,
  startAt,
  endAt,
  limitToFirst,
  get
} from "firebase/database";
import { Timestamp } from "firebase/firestore";

class MovementsRepository {
  saveInvestment (description, amount) {
    const db = getDatabase();
    const key = push(child(ref(db), 'investments')).key
    set(ref(db, 'investments/' + key), {
      desc: description,
      amount: Number.parseFloat(amount),
      timestamp : Timestamp.now().toMillis()
    });
  }

  saveSpending (description, amount) {
    const db = getDatabase();
    const key = push(child(ref(db), 'spendings')).key
    set(ref(db, 'spendings/' + key), {
      desc: description,
      amount: Number.parseFloat(amount),
      timestamp : Timestamp.now().toMillis()
    });
  }

  async getInvestments () {
    const db = getDatabase()
    const investmentsRef = query(ref(db, 'investments')) // TODO: Limit and order by timestamp ----, orderByChild('desc'), startAt(customStart ?? search), endAt(search+'\uf8ff'), limitToFirst(pageSize))
    const result = await get(investmentsRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }

  async getSpendings () {
    const db = getDatabase()
    const spendingsRef = query(ref(db, 'spendings')) // TODO: Limit and order by timestamp ----, orderByChild('desc'), startAt(customStart ?? search), endAt(search+'\uf8ff'), limitToFirst(pageSize))
    const result = await get(spendingsRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }
}

export default MovementsRepository;
