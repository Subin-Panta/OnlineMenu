import React from 'react'
import classes from './Bill.module.css'
const Bill = () => {
	return (
		<div className={classes.bill}>
			<h3>Your Bill</h3>
			<span>
				Send your Frontend data to backend to verify the prices and total
				recieve all yout prices as components load and you cant change data here
			</span>
		</div>
	)
}

export default Bill
