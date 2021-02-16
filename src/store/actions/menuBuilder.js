import * as actionTypes from './types'
import axios from 'axios'
export const setMenu = menuItems => {
	return {
		type: actionTypes.SET_MENU,
		menuItems
	}
}
export const fetchFail = () => {
	return { type: actionTypes.FETCH_FAILED }
}

export const initMenu = () => {
	return async dispatch => {
		try {
			//forced error
			const data = await axios.get('/menu/', { withCredentials: true })

			dispatch(setMenu(data.data.items))
		} catch (error) {
			dispatch(fetchFail())
		}
	}
}
