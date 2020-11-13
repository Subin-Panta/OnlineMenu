import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initMenu } from '../../../store/actions/index'
import spinner from '../../UI/spinner/Spinner'
import Spinner from '../../UI/spinner/Spinner'
import classes from './Menu.module.css'
const Menu = ({ menu, initMenu }) => {
	const [ingredientCount, setIngredientCount] = useState({})
	useEffect(() => {
		initMenu()
	}, [initMenu])
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
	console.log(menu)
	const addItem = e => {
		if (
			Object.keys(ingredientCount).find(i => i === e.target.name) ===
			e.target.name
		) {
			setIngredientCount({
				...ingredientCount,
				[e.target.name]: ingredientCount[e.target.name] + 1
			})
		} else {
			setIngredientCount({
				...ingredientCount,
				[e.target.name]: 1
			})
		}
	}
	const disableChecker = name => {
		// console.log(ingredientCount.length)
		if (Object.keys(ingredientCount).length === 0) {
			return true
		} else {
			const condition =
				Object.keys(ingredientCount).find(i => i === name) === name

			if (condition && ingredientCount[name] !== 0) {
				return false
			} else return true
		}
	}
	const removeItem = e => {
		//error handling logic goes here
		// if (Object.keys(ingredientCount).length === 0) {
		// 	//error handling logic
		// }
		setIngredientCount({
			...ingredientCount,
			[e.target.name]: ingredientCount[e.target.name] - 1
		})
	}
	const conditionals = name => {
		//i am a genious
		//console.log(Object.keys(ingredientCount).find(i => i === name) === name)
		//console.log(Object.keys(ingredientCount).length)//length of the object
		if (Object.keys(ingredientCount).length === 0) {
			return 0
		} else {
			const condition =
				Object.keys(ingredientCount).find(i => i === name) === name
			if (condition) {
				return ingredientCount[name]
			} else return 0
		}
		//console.log(Object.keys(ingredientCount)) // array duncha yesle
		// if (ingredientCount.length > 0 && ingredientCount.map(i => [i] === name)) {
		// 	return 100
		// }
		// return 0
	}
	const tableBody = dummydata.map((item, index) => (
		<tr key={index}>
			<td>{item.name}</td>
			<td>Rs {item.price}</td>
			<td>
				<button
					className={classes.btnDanger}
					name={item.name}
					onClick={removeItem}
					disabled={disableChecker(item.name)}
				>
					-
				</button>
				{conditionals(item.name)}
				<button
					className={classes.btnSuccess}
					onClick={addItem}
					name={item.name}
				>
					+
				</button>
			</td>
		</tr>
	))
	return (
		<div className={classes.table}>
			<table>
				<thead>
					<tr>
						<th>Items</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{!menu.tems ? <Spinner /> : tableBody}
					{/* {dummydata.map((item, index) => (
						<tr key={index}>
							<td>{item.name}</td>
							<td>Rs {item.price}</td>
							<td>
								<button
									className={classes.btnDanger}
									name={item.name}
									onClick={removeItem}
									disabled={disableChecker(item.name)}
								>
									-
								</button>
								{conditionals(item.name)}
								<button
									className={classes.btnSuccess}
									onClick={addItem}
									name={item.name}
								>
									+
								</button>
							</td>
						</tr>
					))} */}
				</tbody>
			</table>
		</div>
	)
}
const mapStateToProps = state => ({ menu: state.menuBuilder })
const mapDispatchToProps = { initMenu }
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
