import * as actionTypes from '../actions/types'

const initialState = {
	error: false,
	loading: true,
	message: null
}
const errorAdd = (state, action) => {
	return {
		...state,
		error: true,
		loading: false,
		message: action.payload.message
	}
}
const errorRemove = (state, action) => {
	return {
		...state,
		error: false,
		loading: false,
		message: null
	}
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ERROR:
			return errorAdd(state, action)
		case actionTypes.ERROR_REMOVE:
			return errorRemove(state, action)
		default:
			return state
	}
}
export default reducer
