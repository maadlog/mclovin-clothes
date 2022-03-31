import {
  ref,
  set,
  push,
  child,
  query,
  get
} from "firebase/database";
import { Timestamp } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

class MovementsRepository extends BaseRepository {
  saveInvestment (description, amount) {
    const key = push(child(ref(this.db), this.base + '/investments')).key
    set(ref(this.db, this.base + '/investments/' + key), {
      desc: description,
      amount: Number.parseFloat(amount),
      timestamp : Timestamp.now().toMillis()
    });
  }

  saveSpending (description, amount) {
    const key = push(child(ref(this.db), this.base + '/spendings')).key
    set(ref(this.db, this.base + '/spendings/' + key), {
      desc: description,
      amount: Number.parseFloat(amount),
      timestamp : Timestamp.now().toMillis()
    });
  }

  async getInvestments () {
    const investmentsRef = query(ref(this.db, this.base + '/investments'))
    const result = await get(investmentsRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }

  async getSpendings () {
    const spendingsRef = query(ref(this.db, this.base + '/spendings'))
    const result = await get(spendingsRef)
    if (result.exists()) {
      return Object.values(result.val()) ?? []
    } else {
      return []
    }
  }
}

export default MovementsRepository;
