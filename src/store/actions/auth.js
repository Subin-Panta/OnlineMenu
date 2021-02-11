import axios from 'axios'
import * as actionTypes from './types'
import { error } from './error'
export const UserInfo = id => {
	return {
		type: actionTypes.VERIFY_USER,
		userId: id
	}
}
export const checkToken = authHeader => {
	return async dispatch => {
		try {
			const response = await axios.get('auth/verifyToken', {
				headers: {
					Authorization: authHeader
				}
			})

			if (response.status === 200) {
				dispatch(UserInfo(response.data.Id))
			}
		} catch (err) {
			console.log('error')
			dispatch(error(err.message))
			dispatch({
				type: actionTypes.CHECK_FAILED
			})
		}
	}
}
export const verifyUser = (email, password, history) => {
	return async dispatch => {
		try {
			const data = { email, password }
			const response = await axios.post('/auth/postLogin', data)
			localStorage.setItem('CSRF token', response.data.HashedcsrfToken)
			dispatch(UserInfo(response.data.Id))
			history.push('/dashboard')
		} catch (err) {
			console.log(err)
			dispatch(error(err.message))
			dispatch({
				type: actionTypes.LOGIN_FAIL
			})
		}
	}
}
