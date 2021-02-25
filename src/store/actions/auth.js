import axios from 'axios'
import * as actionTypes from './types'
import { error } from './error'
export const UserInfo = (id, name) => {
	return {
		type: actionTypes.VERIFY_USER,
		userId: id,
		name
	}
}
export const checkToken = authHeader => {
	//add global axios headers where user Id is stored
	return async dispatch => {
		try {
			const response = await axios.get('api/auth/verifyToken')
			if (response.status === 200) {
				axios.defaults.headers.common['Authorization'] = authHeader
				axios.defaults.headers.common['userId'] = response.data.Id
				dispatch(UserInfo(response.data.Id, response.data.name))
			}
		} catch (err) {
			console.log('error')
			dispatch(error(err.message))
			if (axios.defaults.headers.common['Authorization']) {
				delete axios.defaults.headers.common['Authorization']
			}
			if (axios.defaults.headers.common['userId']) {
				delete axios.defaults.headers.common['userId']
			}
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
			const response = await axios.post('api/auth/postLogin', data)
			localStorage.setItem('CSRF token', response.data.HashedcsrfToken)
			axios.defaults.headers.common['Authorization'] =
				response.data.HashedcsrfToken
			axios.defaults.headers.common['userId'] = response.data.Id
			dispatch(UserInfo(response.data.Id, response.data.name))
			history.push('/dashboard')
		} catch (err) {
			console.log(err)
			dispatch(error(err.message))
			if (axios.defaults.headers.common['Authorization']) {
				delete axios.defaults.headers.common['Authorization']
			}
			if (axios.defaults.headers.common['userId']) {
				delete axios.defaults.headers.common['userId']
			}

			dispatch({
				type: actionTypes.LOGIN_FAIL
			})
		}
	}
}
export const logout = authHeader => {
	return async dispatch => {
		//send logout request to backend as HttpOnly cookie can only be deleted by backend /auth/logout post
		try {
			const response = axios.post('api//auth/logout', null)
			delete axios.defaults.headers.common['Authorization']
			delete axios.defaults.headers.common['userId']
			//update reducer where CSRF is removed
			dispatch({
				type: actionTypes.LOGOUT
			})
		} catch (err) {
			dispatch(error(err.message))
			if (axios.defaults.headers.common['Authorization']) {
				delete axios.defaults.headers.common['Authorization']
			}
			if (axios.defaults.headers.common['userId']) {
				delete axios.defaults.headers.common['userId']
			}
			dispatch({
				type: actionTypes.LOGOUT_FAILED
			})
		}
	}
}
