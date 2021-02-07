import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initMenu, addItem, removeItem } from '../../../store/actions/index'
import { Link } from 'react-router-dom'
import Spinner from '../../UI/spinner/Spinner'
import classes from './Menu.module.css'
import axios from 'axios'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
const Menu = ({ menu, initMenu, order, addItem, removeItem }) => {
	useEffect(() => {
		console.log('axios request sending and reciening')
		initMenu()
	}, [initMenu])

	const disableChecker = name => {
		// console.log(ingredientCount.length)
		if (Object.keys(order.itemCount).length === 0) {
			return true
		} else {
			const condition =
				Object.keys(order.itemCount).find(i => i === name) === name

			if (condition && order.itemCount[name] !== 0) {
				return false
			} else return true
		}
	}

	const conditionals = name => {
		//i am a genious
		//console.log(Object.keys(ingredientCount).find(i => i === name) === name)
		//console.log(Object.keys(ingredientCount).length)//length of the object
		if (Object.keys(order.itemCount).length === 0) {
			return 0
		} else {
			const condition =
				Object.keys(order.itemCount).find(i => i === name) === name
			if (condition) {
				return order.itemCount[name]
			} else return 0
		}
		//console.log(Object.keys(ingredientCount)) // array duncha yesle
		// if (ingredientCount.length > 0 && ingredientCount.map(i => [i] === name)) {
		// 	return 100
		// }
		// return 0
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Items</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{!menu.items ? (
						<tr>
							<td>
								<Spinner />
							</td>
							<td>
								<Spinner />
							</td>
							<td>
								<Spinner />
							</td>
						</tr>
					) : (
						menu.items.map((item, index) => (
							<tr key={index}>
								<td>
									<Link
										className={classes.linkStyle}
										to={'menuItems/' + item.name}
									>
										{item.name}
									</Link>
								</td>
								<td>Rs {item.price}</td>
								<td>
									<button
										className={classes.btnDanger}
										name={item.name}
										onClick={e => removeItem(e, item.price)}
										disabled={disableChecker(item.name)}
									>
										-
									</button>
									{conditionals(item.name)}
									<button
										className={classes.btnSuccess}
										onClick={e => addItem(e, item.price)}
										name={item.name}
									>
										+
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}
const mapStateToProps = state => ({
	menu: state.menuBuilder,
	order: state.orderBuilder
})
const mapDispatchToProps = { initMenu, addItem, removeItem }
export default withErrorHandler(
	connect(mapStateToProps, mapDispatchToProps)(Menu),
	axios
)
