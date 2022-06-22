import { doc, collection, getFirestore, getDocs, getDoc, Firestore, DocumentReference, CollectionReference } from 'firebase/firestore'

function dbKeyForperiod (date: Date) {
	return `${date.getUTCFullYear()}${date.getUTCMonth() + 1}`
}

class BaseRepository {
	base: string
	firestore: Firestore
	baseDocument: DocumentReference
	constructor(date: Date = new Date()) {
		this.base = dbKeyForperiod(date)
		this.firestore = getFirestore()
		const ledgers = collection(this.firestore, 'monthly-ledgers')
		this.baseDocument = doc(ledgers, this.base)
	}

	async _getAllDocsFromCollection<T extends { id: string }>(collectionRef: CollectionReference) {
		const snapshot = await getDocs(collectionRef)
		const result: T[] = []
		snapshot.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() } as T)
		})
		return result
	}

	async _getDocById(id: string, collectionRef: CollectionReference) {
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
