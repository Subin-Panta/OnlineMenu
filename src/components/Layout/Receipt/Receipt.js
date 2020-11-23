import React, { useEffect } from 'react'
import classes from './Receipt.module.css'
import { connect } from 'react-redux'
// const lister = object => {
// 	for (const key in object) {
// 		console.log('render')
// 		return (
// 			<tr>
// 				<td>{key}</td>
// 				<td>{object[key]}</td>
// 				<td>price mothafucka</td>
// 			</tr>
// 		)
// 	}
// }

const Receipt = ({ order, menu }) => {
	return (
		<div>
			{/* <h1 className={classes.header}>Your Orders</h1> */}
			<table>
				<thead>
					<tr>
						<th>Items</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{/* {console.log(Object.keys(order.itemCount).length)} */}
					{Object.keys(order.itemCount).length > 0 &&
					Object.keys(order.itemPrice).length > 0
						? Object.keys(order.itemCount).map((key, index) => {
								return (
									<tr key={index}>
										<td>{key}</td>
										<td>{order.itemCount[key]}</td>
										<td>{order.itemPrice[key]}</td>
									</tr>
								)
						  })
						: null}
				</tbody>
			</table>
		</div>
	)
}
const mapStateToProps = state => ({
	order: state.orderBuilder,
	menu: state.menuBuilder
})
export default connect(mapStateToProps)(Receipt)
