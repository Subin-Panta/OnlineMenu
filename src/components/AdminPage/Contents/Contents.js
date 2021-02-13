import React, { Fragment } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
// import PropTypes from 'prop-types'
import classes from './Contents.module.css'
const Contents = props => {
	const history = useHistory()
	return (
		<Fragment>
			{/* on click send request to backend to see orders and its invoices */}
			<div className={classes.first}>Orders </div>
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
			<div className={classes.third}>Edit Customer Support</div>
		</Fragment>
	)
}

// Contents.propTypes = {}

export default Contents
