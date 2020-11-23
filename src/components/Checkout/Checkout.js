import React from 'react'
import Bill from '../Layout/Bill/Bill'
import DetailForm from '../Layout/DetailForm/DetailForm'
import classes from './Checkout.module.css'
const Checkout = () => {
	return (
		<div className={classes.container}>
			<Bill />
			<DetailForm />
		</div>
	)
}

export default Checkout
