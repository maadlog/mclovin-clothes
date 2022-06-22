import { addDoc, collection, CollectionReference, Timestamp } from 'firebase/firestore'
import { Sale } from '../types/Sale'
import BaseRepository from './BaseRepository'

class SalesRepository extends BaseRepository {
	salesCollection: CollectionReference

	constructor(date?: Date) {
		super(date)
		this.salesCollection = collection(this.baseDocument, 'sales')
	}
	async saveSale(description: string, purchasePrice: number, salePrice: number) {
		await addDoc(this.salesCollection,{
			desc: description,
			purchase: purchasePrice,
			sale: salePrice,
			timestamp: Timestamp.now().toMillis()
		})
	}

	async getSales (): Promise<Sale[]> {
		const sales = await this._getAllDocsFromCollection(this.salesCollection)
		return sales.map(sale => {
			const result: unknown = ({ entity: 'Sale', ...sale }) // TODO: Use transformer
			return result as Sale
		})
	}
}

export default SalesRepository
