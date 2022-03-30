import { getDatabase, ref, set, push, child } from "firebase/database";
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
}

export default MovementsRepository;
