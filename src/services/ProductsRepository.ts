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
	CollectionReference
} from 'firebase/firestore'
import BaseRepository from './BaseRepository'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Product } from '../types/Product'
import { ProductPurchase } from '../types/ProductPurchase'

class ProductsRepository extends BaseRepository {
	productPurchasesCollection: CollectionReference
	productsCollection: CollectionReference
	
	constructor(date?: Date) {
		super(date)
		this.productsCollection = collection(this.firestore, 'products')
		this.productPurchasesCollection = collection(this.baseDocument, 'product-purchases')
	}
	async saveProduct (description: string, purchasePrice: string, salePrice: string, quantity: string, pictureFile?: Blob) {
		if (!description || !purchasePrice || !salePrice || !quantity) {
			throw new Error('Validation error')
		}
		const value = {
			desc: description,
			desc_insensitive: description.toUpperCase(),
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

	async getProductsPurchased (): Promise<ProductPurchase[]> {
		const purchases = await this._getAllDocsFromCollection(this.productPurchasesCollection)
		return purchases.map(x => x as unknown as ProductPurchase) // TODO: Use transformer
	}
}

export default ProductsRepository