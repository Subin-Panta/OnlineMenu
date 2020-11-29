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
	//pachi backend ma c\connect garda async huncha ani catch block ma we dispatch fetchfail
	return async dispatch => {
		const data = await axios.get('/menu/')
		console.log(data)
		const dummydata = [
			{
				name: 'MOMO',
				price: '100'
			},
			{
				name: 'Burger',
				price: '150'
			},
			{
				name: 'Pizza',
				price: '250'
			},
			{
				name: 'Chowmein',
				price: '100'
			},
			{
				name: 'Fried Rice',
				price: '50'
			},
			{
				name: 'Naan',
				price: '100'
			}
		]
		dispatch(setMenu(data.data.items))
	}
}
