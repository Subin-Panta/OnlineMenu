import { localDel } from '../actions/adminActions'
import * as actionTypes from '../actions/types'
const initialState = {
	error: false,
	loading: true
}
const setMenu = (state, action) => {
	return {
		...state,
		error: false,
		loading: false,
		items: [...action.menuItems]
	}
}
const fetchFail = state => {
	return {
		...state,
		loading: false,
		error: true
	}
}
const localAddition = (state, action) => {
	const newItems = [...state.items, action.item.data.result]
	return { ...state, error: false, loading: false, items: newItems }
}
const localDeletion = (state, action) => {
	const newState = state.items.filter(item => item._id !== action.id)
	return { ...state, items: newState, loading: false, error: false }
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOCAL_ADD:
			return localAddition(state, action)
		case actionTypes.LOCAL_DEL:
			return localDeletion(state, action)
		case actionTypes.SET_MENU:
			return setMenu(state, action)
		case actionTypes.FETCH_FAILED:
			return fetchFail(state)
		default:
			return state
	}
}

export default reducer
