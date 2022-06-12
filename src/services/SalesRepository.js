import { addDoc, collection, Timestamp } from 'firebase/firestore'
import BaseRepository from './BaseRepository'

class SalesRepository extends BaseRepository {
	constructor(date) {
		super(date)
		this.salesCollection = collection(this.baseDocument, 'sales')
	}
	async saveSale(description, purchasePrice, salePrice) {
		await addDoc(this.salesCollection,{
			desc: description,
			purchase: Number.parseFloat(purchasePrice),
			sale: Number.parseFloat(salePrice),
			timestamp: Timestamp.now().toMillis()
		})
	}

	async getSales () {
		const sales = await this._getAllDocsFromCollection(this.salesCollection)
		return sales.map(sale => ({ entity: 'Sale', ...sale }))
	}
}

export default SalesRepository
