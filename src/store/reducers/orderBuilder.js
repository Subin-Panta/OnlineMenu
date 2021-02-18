import { orderpost } from '../actions/orderBuilder'
import * as actionTypes from '../actions/types'
const initalState = {
	error: false,
	loading: true,
	itemCount: {},
	itemPrice: {}
}
const addItem = (state, e, price) => {
	if (
		Object.keys(state.itemCount).find(i => i === e.target.name) ===
		e.target.name
	) {
		return {
			...state,
			loading: false,
			itemCount: {
				...state.itemCount,
				[e.target.name]: state.itemCount[e.target.name] + 1
			},
			itemPrice: {
				...state.itemPrice,
				[e.target.name]: +state.itemPrice[e.target.name] + +price
			}
		}
	} else {
		return {
			...state,
			loading: false,
			itemCount: {
				...state.itemCount,
				[e.target.name]: 1
			},
			itemPrice: {
				...state.itemPrice,
				[e.target.name]: price
			}
		}
	}
}
const newFilter = (obj, name) => {
	// console.log(obj, name)
	// let newobj = {}
	for (var key in obj) {
		if (key === name) {
			delete obj[key]
		}
	}

	return obj
}
const removeItem = (state, e, price) => {
	//error handling logic goes here
	// if (Object.keys(ingredientCount).length === 0) {
	// 	//error handling logic
	// }
	//filter it out if count is exactly equal to 1

	if (state.itemCount[e.target.name] === 1) {
		const newitemCount = newFilter(state.itemCount, e.target.name)
		const newitemPrice = newFilter(state.itemPrice, e.target.name)
		console.log(newitemPrice)
		return {
			...state,
			loading: false,
			itemCount: { ...newitemCount }
		}
	} else {
		return {
			...state,
			loading: false,
			itemCount: {
				...state.itemCount,
				[e.target.name]: state.itemCount[e.target.name] - 1
			},
			itemPrice: {
				...state.itemPrice,
				[e.target.name]: +state.itemPrice[e.target.name] - +price
			}
		}
	}
}
 const clearAll = state => {
	return {
		error: false,
		loading: false,
		itemCount: {},
		itemPrice: {}
	}
}

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ITEM:
			return addItem(state, action.e, action.price)
		case actionTypes.REMOVE_ITEM:
			return removeItem(state, action.e, action.price)
		case actionTypes.CLEAR_ALL: {
			return clearAll()
		}
	
		default:
			return state
	}
}

export default reducer
