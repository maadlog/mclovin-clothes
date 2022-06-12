import { doc, collection, getFirestore, getDocs, getDoc } from 'firebase/firestore'

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

	async _getDocById(id, collectionRef) {
		const docRef = doc(collectionRef, id)
		const snapshot = await getDoc(docRef)
		if (snapshot.exists()) {
			return { id: snapshot.id, ...snapshot.data() }
		} else {
			return undefined
		}
	}
}

export default BaseRepository
