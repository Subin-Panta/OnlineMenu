import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Receipt from '../Receipt/Receipt'
import classes from './Bill.module.css'
const Bill = order => {
	const [total, setTotal] = useState(0)
	//localState to add verified total
	useEffect(() => {
		const verify = async () => {
			if (order.order.itemCount !== 0) {
				const res = await axios.post('/api/menu/order', {
					bill: order.order.itemCount
				})
				if (res.status !== 200) {
					throw new Error('Servers are busy right not')
				}
				setTotal(res.data.total)
			}
		}
		verify()
	}, [order.order.itemCount])
	//if order.order.itemCount.length !==0
	//send post request to axios which sends order.order.itemCount
	const billContents = (
		<div>
			<table>
				<thead>
					<th>Items</th>
					<th>Count</th>
					<th>Price</th>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	)
	return (
		<div className={classes.bill}>
			<h3>Your Bill</h3>
			<Receipt />
			<h4>Total : {total}</h4>
		</div>
	)
}
//use Redux to get bill
const mapStateToProps = state => ({
	order: state.orderBuilder
})
export default connect(mapStateToProps)(Bill)
