import React from 'react'

export function mapValueTo(fn: (value: string) => void) {
	return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		return fn(event.target.value)
	}
}
