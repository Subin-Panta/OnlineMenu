import * as actionTypes from '../actions/types'

const initialState = {
	name: null,
	verified: false,
	userId: null,
	error: false,
	loading: true
}
const verifyUser = (state, action) => {
	return {
		...state,
		name: action.name,
		verified: true,
		userId: action.userId,
		error: false,
		loading: false
	}
}
const logout = (state, action) => {
	return {
		...state,
		name: null,
		verified: false,
		userId: null,
		error: false,
		loading: false
	}
}
const logoutFail = (state, action) => {
	return {
		...state
	}
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.VERIFY_USER:
			return verifyUser(state, action)
		case actionTypes.LOGIN_FAIL:
		case actionTypes.LOGOUT:
			localStorage.removeItem('CSRF token')
			return {
				...state,
				name: null,
				error: false,
				verified: false,
				loading: false,
				userId: null
			}

		case actionTypes.LOGIN_FAIL:
			return logoutFail(state, action)
		default:
			return state
	}
}
export default reducer
