import { addDoc, collection, CollectionReference, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { Investment } from '../types/Investment'
import { Spending } from '../types/Spending'
import BaseRepository from './BaseRepository'

class MovementsRepository extends BaseRepository {
	investmentsCollection: CollectionReference
	spendingsCollection: CollectionReference
	constructor() {
		super()
		this.investmentsCollection = collection(this.firestore, 'investments')
		this.spendingsCollection =  collection(this.firestore, 'spendings')
	}

	async saveInvestment (description: string, amount: string) {
		if (!description || !amount) {
			throw new Error('Validation error')
		}
		await addDoc(this.investmentsCollection, {
			desc: description,
			amount: Number.parseFloat(amount),
			timestamp : Timestamp.now().toMillis()
		})
	}

	async saveSpending (description: string, amount: string) {
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
		return investments.map(investment => {
			const result: unknown = ({ entity: 'Investment', ...investment })
			return result as Investment
		})
	}

	async getSpendings (): Promise<Spending[]> {
		const spendings = await this._getAllDocsFromCollection(this.spendingsCollection)
		return spendings.map(spending => {
			const result: unknown = ({ entity: 'Spending', ...spending })  //TODO use transformer
			return result as Spending
		})
	}

	async getInvestmentById (id: string): Promise<Investment> {
		const result: unknown = this._getDocById(id, this.investmentsCollection) //TODO use transformer
		return result as Investment
	}

	async getSpendingById (id: string): Promise<Spending> {
		const result: unknown = this._getDocById(id, this.spendingsCollection) //TODO use transformer
		return result as Spending
	}

	async deleteInvestment(id: string) {
		const docRef = doc(this.investmentsCollection, id)
		return deleteDoc(docRef)
	}

	async deleteSpending(id: string) {
		const docRef = doc(this.spendingsCollection, id)
		return deleteDoc(docRef)
	}

	async saveInvestmentFull (investment: Investment) {
		let docRef
		if (investment.id) {
			docRef = doc(this.investmentsCollection, investment.id)
		} else {
			docRef = doc(this.investmentsCollection)
			investment.timestamp = Timestamp.now().toMillis()
		}
		
		await setDoc(docRef, investment)
	}

	async saveSpendingFull (spending: Spending) {
		let docRef
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
