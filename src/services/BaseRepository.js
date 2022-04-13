import { doc, collection, getFirestore, getDocs } from 'firebase/firestore'

function dbKeyForperiod (date) {
	return `${date.getUTCFullYear()}${date.getUTCMonth() + 1}`
}

class BaseRepository {
	constructor(date  = new Date()) {
		this.base = dbKeyForperiod(date)
		this.firestore = getFirestore()
		const ledgers = collection(this.firestore, 'monthly-ledgers')
		this.baseDocument = doc(ledgers, this.base)
	}

	async _getAllDocsFromCollection(collectionRef) {
		const snapshot = await getDocs(collectionRef)
		const result = []
		snapshot.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() })
		})
		return result
	}
}

export default BaseRepository
