import { doc, getFirestore, getDocs, getDoc, Firestore, CollectionReference } from 'firebase/firestore'

class BaseRepository {
	firestore: Firestore
	constructor() {
		this.firestore = getFirestore()
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
