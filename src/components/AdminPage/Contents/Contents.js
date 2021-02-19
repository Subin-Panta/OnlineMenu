import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import PropTypes from 'prop-types'
import classes from './Contents.module.css'
const Contents = props => {
	const history = useHistory()
	return (
		<Fragment>
			{/* on click send request to backend to see orders and its invoices */}
			<Link to='/orders' style={{ textDecoration: 'none', color: 'black' }}>
				<div className={classes.first}>Orders</div>
			</Link>
			{/* new component in react where admin can see all the orders */}
			{/* on click redirect to private route adding, deleting and editing menu items */}
			<div
				className={classes.second}
				onClick={() => {
					history.push('/modify')
				}}
			>
				Edit Menu
			</div>
			{/*ability to add or remove contact information */}
			<Link to='/signUp' style={{ textDecoration: 'none', color: 'black' }}>
				<div className={classes.third}>Add new Admin</div>
			</Link>
		</Fragment>
	)
}

// Contents.propTypes = {}

export default Contents
