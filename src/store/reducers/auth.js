import * as actionTypes from '../actions/types'

const initialState = {
	verified: false,
	userId: null,
	error: false,
	loading: true
}
const verifyUser = (state, action) => {
	return {
		...state,
		verified: true,
		userId: action.userId,
		error: false,
		loading: false
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.VERIFY_USER:
			return verifyUser(state, action)
		case actionTypes.LOGIN_FAIL:
			localStorage.removeItem('token')
			return {
				...state,
				error: false,
				verified: false,
				loading: false,
				userId: null
			}
		default:
			return state
	}
}
export default reducer
