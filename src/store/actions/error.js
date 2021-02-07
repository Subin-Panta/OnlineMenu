import * as actionTypes from './types'
export const error = message => {
	return dispatch => {
		dispatch(errorAdd(message))
		setTimeout(() => {
			dispatch(errorRemove())
		}, 5000)
	}
}
export const errorAdd = message => {
	return {
		type: actionTypes.ERROR,
		payload: {
			message
		}
	}
}
export const errorRemove = () => {
	return {
		type: actionTypes.ERROR_REMOVE
	}
}
