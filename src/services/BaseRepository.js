import {getDatabase} from "firebase/database";

function dbKeyForperiod (date) {
  return `${date.getUTCFullYear()}${date.getUTCMonth()}`
}

class BaseRepository {
  constructor(date  = new Date()) {
    this.base = dbKeyForperiod(date)
    this.db = getDatabase();
  }
}

export default BaseRepository
