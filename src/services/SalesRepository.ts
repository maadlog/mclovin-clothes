import { addDoc, collection, CollectionReference, query, Timestamp } from 'firebase/firestore'
import { Sale } from '../types/Sale'
import BaseRepository from './BaseRepository'

class SalesRepository extends BaseRepository {
	salesCollection: CollectionReference

	constructor() {
		super()
		this.salesCollection = collection(this.firestore, 'sales')
	}
	async saveSale(description: string, purchasePrice: number, salePrice: number) {
		await addDoc(this.salesCollection, {
			desc: description,
			purchase: purchasePrice,
			sale: salePrice,
			timestamp: Timestamp.now().toMillis()
		})
	}

	async getSalesFrom (date: Date): Promise<Sale[]> {
		const timestampFilter = this._withTimestampBetween(date)
		const request = query(this.salesCollection, ...timestampFilter)
		const sales = await this._query(request)
		return sales.map(sale => {
			const result: unknown = ({ entity: 'Sale', ...sale }) // TODO: Use transformer
			return result as Sale
		})
	}
}

export default SalesRepository
