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

export const addNew = (data) => {
	return async dispatch => {
		try {
			const response = await axios.post('api/menu', data)
			if (response.status === 201) {
				dispatch(localAdd(response))
			}
		} catch (err) {
			console.log('error')
			dispatch(error(err.message))
		}
	}
}
export const deleteItem = (id) => {
	return async dispatch => {
		try {
			const response = await axios.post(`api/auth/deleteItem/${id}`)
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
export const editItem = (id, fdata) => {
	//pass id as params
	//pass csrf header
	return async dispatch => {
		try {
			const response = await axios.post(`api/auth/editItem/${id}`, fdata)
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
