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
import { getStorage, ref, uploadBytes } from 'firebase/storage'

class ProductsRepository extends BaseRepository {
	constructor(date) {
		super(date)
		this.productsCollection = collection(this.firestore, 'products')
		this.productPurchasesCollection = collection(this.baseDocument, 'product-purchases')
	}
	async saveProduct (description, purchasePrice, salePrice, quantity, pictureFile) {
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

		if (pictureFile) {
			await this.setPicture(docRef.id, pictureFile)
		}
	}

	async setStock (productKey, quantity, desc) {
		const qt = Math.max(quantity, 0)
		const updates = { qt }
		if (qt === 0) {
			updates.desc = '_VENDIDO_'+desc
		}
		await setDoc(doc(this.productsCollection, productKey), updates, { merge: true })
	}

	async setPicture (productKey, imageFile) {
		const storage = getStorage()
		const picReference = ref(storage, `product-pictures/${productKey}/picture.jpg`)

		await uploadBytes(picReference, imageFile)
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
