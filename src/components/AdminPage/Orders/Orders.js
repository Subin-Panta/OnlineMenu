/* //private Route and needs error handler HOC*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import classes from './Orders.module.css'
import Spinner from '../../UI/spinner/Spinner'
import { v4 as uuidv4 } from 'uuid'

//import PropTypes from 'prop-types'

const Orders = props => {
	const [localOrders, setOrders] = useState({
		loading: true,
		orders: null
	})

	useEffect(() => {
		console.log('called')

		const callingFunction = async () => {
			try {
				const response = await axios.get('/order/getOrders')
				console.log(response)
				if (response.status === 200) {
					setOrders({
						orders: { ...response.data },
						loading: false
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
		callingFunction()
	}, [])
	const getInvoice = async id => {
		//dont wanna call a redux action since i won't store it in a global State
		//need localStorage csrf token

		try {
			const response = await axios.get(`/order/invoice/${id}`, {
				responseType: 'blob'
			})
			const file = new Blob([response.data], { type: 'application/pdf' })
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file)
			//Open the URL on new Window
			const pdfWindow = window.open()
			pdfWindow.location.href = fileURL
		} catch (error) {
			console.log(error)
		}
	}
	const content = () => {
		if (localOrders.orders.result.length === 0) {
			return <h3>no Order</h3>
		}
		return localOrders.orders.result.map((item, index) => {
			const arrConverted = Object.keys(item.order)
			return (
				<div key={index} className={classes.container}>
					<h3 className={classes.heading} onClick={() => getInvoice(item._id)}>
						Order #{item._id}
					</h3>
					<div className={classes.mainContainer}>
						<div className={classes.subContainer1}>
							<ul>
								{arrConverted.map(a => (
									<li key={uuidv4()}>
										{a} -- {item.order[a]}
									</li>
								))}
							</ul>
						</div>
						<div className={classes.subContainer2}>
							{/* make user info appear on right */}
							<span>Name: {item.name}</span>
							<span>Phone Number: {item.phoneNo}</span>
							<span>Address: {item.address}</span>
							<span>
								Additional Details: {item.additionalDetails || 'none'}
							</span>
						</div>
					</div>
					<div className={classes.total}>Total :Rs {item.total}</div>
				</div>
			)
		})
	}
	return (
		<div>
			<h1 className={classes.heading}>Orders</h1>

			{localOrders.loading ? <Spinner /> : content()}
		</div>
	)
}

// Orders.propTypes = {

// }

export default WithErrorHandler(Orders, axios)
