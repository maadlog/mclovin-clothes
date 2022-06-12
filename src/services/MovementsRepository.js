import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore'
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
		const investments = await this._getAllDocsFromCollection(this.investmentsCollection)
		return investments.map(investment => ({ entity: 'Investment', ...investment }))
	}

	async getSpendings () {
		const spendings = await this._getAllDocsFromCollection(this.spendingsCollection)
		return spendings.map(spending => ({ entity: 'Spending', ...spending }))
	}

	async getInvestmentById (id) {
		return this._getDocById(id, this.investmentsCollection)
	}

	async getSpendingById (id) {
		return this._getDocById(id, this.spendingsCollection)
	}

	async deleteInvestment(id) {
		const docRef = doc(this.investmentsCollection, id)
		return deleteDoc(docRef)
	}

	async deleteSpending(id) {
		const docRef = doc(this.spendingsCollection, id)
		return deleteDoc(docRef)
	}

	async saveInvestmentFull (investment) {
		var docRef
		if (investment.id) {
			docRef = doc(this.investmentsCollection, investment.id)
		} else {
			docRef = doc(this.investmentsCollection)
			investment.timestamp = Timestamp.now().toMillis()
		}
		
		await setDoc(docRef, investment)
	}

	async saveSpendingFull (spending) {
		var docRef
		if (spending.id) {
			docRef = doc(this.spendingsCollection, spending.id)
		} else {
			docRef = doc(this.spendingsCollection)
			spending.timestamp = Timestamp.now().toMillis()
		}
		await setDoc(docRef, spending)
	}
}

export default MovementsRepository
