import * as actionTypes from '../actions/types'

const initialState = {
	verified: false,
	error: false,
	loading: true
}
const verifyUser = (state, action) => {
	return {
		verified: true,
		error: false,
		loading: false
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.VERIFY_USER:
			return verifyUser(state, action)
		default:
			return state
	}
}
export default reducer
