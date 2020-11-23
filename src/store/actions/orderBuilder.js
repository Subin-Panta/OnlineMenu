import * as actionTypes from './types'

export const addItem = (e, price) => {
	return {
		type: actionTypes.ADD_ITEM,
		e,
		price
	}
}
export const removeItem = (e, price) => {
	return {
		type: actionTypes.REMOVE_ITEM,
		e,
		price
	}
}
export const clearAll = () => {
	return {
		type: actionTypes.CLEAR_ALL
	}
}
