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
	getDocs,
	deleteDoc,
	CollectionReference
} from 'firebase/firestore'
import BaseRepository from './BaseRepository'
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage'
import { Product } from '../types/Product'
import { ProductPurchase } from '../types/ProductPurchase'

class ProductsRepository extends BaseRepository {
	productPurchasesCollection: CollectionReference
	productsCollection: CollectionReference
	
	constructor() {
		super()
		this.productsCollection = collection(this.firestore, 'products')
		this.productPurchasesCollection = collection(this.firestore, 'product-purchases')
	}
	async saveProduct (description: string, purchasePrice: string, salePrice: string, quantity: string, pictureFile?: Blob, id?: string, timestamp?: number) {
		if (!description || !purchasePrice || !salePrice || !quantity) {
			throw new Error('Validation error')
		}
		const value = {
			desc: description,
			desc_insensitive: description.toUpperCase(),
			purchase: Number.parseFloat(purchasePrice),
			sale: Number.parseFloat(salePrice),
			qt: Number.parseInt(quantity),
			timestamp : timestamp || Timestamp.now().toMillis()
		}
		let docRef
		if (id) {
			docRef = doc(this.productsCollection, id)
			setDoc(docRef, value)
		} else {
			docRef = await addDoc(this.productsCollection, value)
		}

		const purchaseDocRef = doc(this.productPurchasesCollection, docRef.id)
		await setDoc(purchaseDocRef, {
			desc: `${value.desc}*${value.qt}`,
			amount: value.purchase * value.qt,
			timestamp : timestamp || Timestamp.now().toMillis(),
		})

		if (pictureFile) {
			await this.setPicture(docRef.id, pictureFile)
		}
	}

	async getProductById(id: string) {
		const result: unknown = await this._getDocById(id, this.productsCollection)
		return result as Product
	}

	async delete(id: string) {
		await Promise.all([
			deleteDoc(doc(this.productsCollection, id)),
			deleteDoc(doc(this.productPurchasesCollection, id)),
			this.deletePicture(id),
		])
	}

	async setStock (productKey: string, quantity: number, desc: string) {
		const qt = Math.max(quantity, 0)
		const updates: { qt: number, desc?: string } = { qt }
		if (qt === 0) {
			updates.desc = '_VENDIDO_'+desc
		}
		await setDoc(doc(this.productsCollection, productKey), updates, { merge: true })
	}

	_getPictureReference (productKey: string) {
		const storage = getStorage()
		return ref(storage, `product-pictures/${productKey}/picture.png`)
	}

	async setPicture (productKey: string, imageFile: Blob) {
		await uploadBytes(this._getPictureReference(productKey), imageFile)
	}

	async deletePicture(productKey: string) {
		await deleteObject(this._getPictureReference(productKey))
	}

	async getPictureUrl (productKey: string) {
		return getDownloadURL(this._getPictureReference(productKey))
	}

	async getProducts (search: string, customStart = null, pageSize = 20): Promise<Product[]> {
		const start = (customStart ?? search).toUpperCase()
		const querySearch = query(this.productsCollection,
			orderBy('desc_insensitive'),
			startAt(start),
			endAt(search + '\uf8ff'),
			limit(pageSize))
		const snapshot = await getDocs(querySearch)
		const result: Product[] = []
		snapshot.forEach((doc) => {
			const product: unknown = { id: doc.id, ...doc.data() } // TODO: Use transformer
			result.push(product as Product)
		})
		return result
	}

	async getProductsPurchasedFrom (date: Date): Promise<ProductPurchase[]> {
		const timestampFilter = this._withTimestampBetween(date)
		const request = query(this.productPurchasesCollection, ...timestampFilter)
		const purchases = await this._query(request)
		return purchases.map(x => x as unknown as ProductPurchase) // TODO: Use transformer
	}
}

export default ProductsRepository
