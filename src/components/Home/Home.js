import React, { Fragment } from 'react'
import Menu from '../Layout/Menu/Menu'
import Receipt from '../Layout/Receipt/Receipt'
import classes from './Home.module.css'
const Home = () => {
	return (
		<div className={classes.container}>
			<div className={classes.menu}>
				<Menu />
			</div>
			<div className={classes.receipt}>
				<Receipt />
			</div>
		</div>
	)
}

export default Home
