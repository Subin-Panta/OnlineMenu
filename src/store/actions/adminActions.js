import axios from 'axios'
import { error } from './error'
import { initMenu } from './menuBuilder'
import * as actionTypes from './types'
export const localAdd = item => {
	return {
		type: actionTypes.LOCAL_ADD,
		item
	}
}
export const localDel = id => {
	return {
		type: actionTypes.LOCAL_DEL,
		id
	}
}

export const addNew = (data, authHeader) => {
	return async dispatch => {
		try {
			const response = await axios.post('/menu', data, {
				headers: {
					Authorization: authHeader
				}
			})
			if (response.status === 201) {
				dispatch(localAdd(response))
			}
		} catch (err) {
			console.log('error')
			dispatch(error(err.message))
		}
	}
}
export const deleteItem = (id, authHeader) => {
	return async dispatch => {
		try {
			const response = await axios.post(`auth/deleteItem/${id}`, null, {
				headers: {
					Authorization: authHeader
				}
			})
			if (response.status !== 200) {
				throw new Error('Please try again Later')
			}
			dispatch(localDel(id))
		} catch (err) {
			console.log('error')
			dispatch(error(err.message))
		}
	}
}
export const editItem = (id, token, fdata) => {
	//pass id as params
	//pass csrf header
	return async dispatch => {
		try {
			const response = await axios.post(`auth/editItem/${id}`, fdata, {
				headers: {
					Authorization: token
				}
			})
			if (response.status !== 200) {
				throw new Error('Please try again later')
			}
			//dispatch localEdit
			dispatch(initMenu())
		} catch (err) {
			console.log('error')
			dispatch(error(err.message))
		}
	}
}
