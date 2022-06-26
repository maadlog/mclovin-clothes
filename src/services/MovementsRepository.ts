import { collection, CollectionReference, deleteDoc, doc, query, setDoc } from 'firebase/firestore'
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

	async getInvestmentsFrom (date: Date) {
		const timestampFilter = this._withTimestampBetween(date)
		const request = query(this.investmentsCollection, ...timestampFilter)
		const investments = await this._query(request)
		return investments.map(investment => {
			const result: unknown = ({ entity: 'Investment', ...investment })
			return result as Investment
		})
	}

	async getSpendingsFrom (date: Date): Promise<Spending[]> {
		const timestampFilter = this._withTimestampBetween(date)
		const request = query(this.spendingsCollection, ...timestampFilter)
		const spendings = await this._query(request)
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
			investment.timestamp = investment.timestamp ?? Timestamp.now().toMillis()
		}
		
		await setDoc(docRef, investment)
	}

	async saveSpendingFull (spending: Spending) {
		let docRef
		if (spending.id) {
			docRef = doc(this.spendingsCollection, spending.id)
		} else {
			docRef = doc(this.spendingsCollection)
			spending.timestamp = spending.timestamp ?? Timestamp.now().toMillis()
		}
		await setDoc(docRef, spending)
	}
}

export default MovementsRepository
