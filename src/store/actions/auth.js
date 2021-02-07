import axios from 'axios'
import * as actionTypes from './types'
import { error } from './error'
export const addToken = token => {
	console.log('token')
	return {
		type: actionTypes.VERIFY_USER,
		token
	}
}
export const verifyUser = (email, password) => {
	return async dispatch => {
		try {
			const data = { email, password }
			console.log(email, password)
			const token = await axios.post('/auth/postLogin', data)

			if (!token.data.token) {
				throw new Error('Unauthorized')
			}
			dispatch(addToken(token.data.token))
		} catch (err) {
			console.log(err)
			dispatch(error(err.message))
		}
	}
}
