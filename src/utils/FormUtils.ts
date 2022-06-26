import { Timestamp } from 'firebase/firestore'
import React from 'react'

export function mapValueTo(fn: (value: string) => void) {
	return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		return fn(event.target.value)
	}
}

export function nowMillis(): number {
	const result = Timestamp.now().toMillis()
	return result
}

export function dateToFormString(date: Date) : string {
	return date.toISOString().split('T')[0]
}

export function millisToFormDateString(timestampMillis: number): string {
	const date = Timestamp.fromMillis(timestampMillis).toDate()
	return dateToFormString(date)
}