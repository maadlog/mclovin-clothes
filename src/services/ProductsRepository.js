import {
	query,
	addDoc,
	setDoc,
	collection,
	Timestamp,
	doc,
	orderBy,
	limit,
	startAt,
	endAt,
	getDocs
} from 'firebase/firestore'
import BaseRepository from './BaseRepository'

class ProductsRepository extends BaseRepository {
	constructor(date) {
		super(date)
		this.productsCollection = collection(this.baseDocument, 'products')
		this.productPurchasesCollection = collection(this.baseDocument, 'product-purchases')
	}
	async saveProduct (description, purchasePrice, salePrice, quantity) {
		const value = {
			desc: description,
			purchase: Number.parseFloat(purchasePrice),
			sale: Number.parseFloat(salePrice),
			qt: Number.parseInt(quantity),
			timestamp : Timestamp.now().toMillis()
		}
		const docRef = await addDoc(this.productsCollection, value)

		const purchaseDocRef = doc(this.productPurchasesCollection, docRef.id)
		await setDoc(purchaseDocRef, {
			desc: `${value.desc}*${value.qt}`,
			amount: value.purchase * value.qt
		})
	}

	async setStock (productKey, quantity, desc) {
		const qt = Math.max(quantity, 0)
		const updates = { qt }
		if (qt === 0) {
			updates.desc = '_VENDIDO_'+desc
		}
		await setDoc(doc(this.productsCollection, productKey), updates, { merge: true })
	}

	async getProducts (search, customStart = null, pageSize = 20) {
		const querySearch = query(this.productsCollection, orderBy('desc'),
			startAt(customStart ?? search),
			endAt(search + '\uf8ff'),
			limit(pageSize))
		const snapshot = await getDocs(querySearch)
		const result = []
		snapshot.forEach((doc) => {
			result.push({ id: doc.id, ...doc.data() })
		})
		return result
	}

	async getProductsPurchased () {
		return this._getAllDocsFromCollection(this.productPurchasesCollection)
	}
}

export default ProductsRepository
