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
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_MENU:
			return setMenu(state, action)
		case actionTypes.FETCH_FAILED:
			return fetchFail(state)
		default:
			return state
	}
}

export default reducer
