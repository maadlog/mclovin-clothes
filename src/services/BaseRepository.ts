import { doc, getFirestore, getDocs, getDoc, Firestore, CollectionReference, Query, QueryConstraint, Timestamp, where, orderBy } from 'firebase/firestore'

class BaseRepository {
	firestore: Firestore
	constructor() {
		this.firestore = getFirestore()
	}

	_withTimestampBetween(dateStart: Date, dateEnd?: Date) : QueryConstraint[] {
		const start = Timestamp.fromDate(dateStart).toMillis()
		const end = Timestamp.fromDate(dateEnd ?? new Date(dateStart.getFullYear(), dateStart.getMonth(), 30)).toMillis()
		return [where('timestamp', '>', start), where('timestamp', '<=', end) ,orderBy('timestamp')]
	}

	async _getAllDocsFromCollection<T extends { id: string }>(collectionRef: CollectionReference) {
		const snapshot = await getDocs(collectionRef)
		const result: T[] = []
		snapshot.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() } as T)
		})
		return result
	}

	async _query<T extends { id: string }>(query: Query) {
		const snapshot = await getDocs(query)
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
