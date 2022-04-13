import { addDoc, collection } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import BaseRepository from './BaseRepository'

class MovementsRepository extends BaseRepository {

	constructor(date) {
		super(date)
		this.investmentsCollection = collection(this.baseDocument, 'investments')
		this.spendingsCollection =  collection(this.baseDocument, 'spendings')
	}

	async saveInvestment (description, amount) {
		if (!description || !amount) {
			throw new Error('Validation error')
		}
		await addDoc(this.investmentsCollection, {
			desc: description,
			amount: Number.parseFloat(amount),
			timestamp : Timestamp.now().toMillis()
		})
	}

	async saveSpending (description, amount) {
		if (!description || !amount) {
			throw new Error('Validation error')
		}
		await addDoc(this.spendingsCollection, {
			desc: description,
			amount: Number.parseFloat(amount),
			timestamp : Timestamp.now().toMillis()
		})
	}

	async getInvestments () {
		return this._getAllDocsFromCollection(this.investmentsCollection)
	}

	async getSpendings () {
		return this._getAllDocsFromCollection(this.spendingsCollection)
	}
}

export default MovementsRepository
