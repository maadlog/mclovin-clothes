import { Timestamp } from 'firebase/firestore'
import React from 'react'

export function mapValueTo(fn: (value: string) => void) {
	return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		return fn(event.target.value)
	}
}

export function dateFromMillis(timestampMillis: number): string {
	const result = Timestamp.fromMillis(timestampMillis).toDate().toISOString().split('T')[0]
	return result
}

export function nowMillis(): number {
	const result = Timestamp.now().toMillis()
	return result
}