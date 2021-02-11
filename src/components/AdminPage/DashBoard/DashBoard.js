import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import classes from './DashBoard.module.css'
// import PropTypes from 'prop-types'

const DashBoard = ({ auth }) => {
	useEffect(() => {
		//Better yet just get name id and store it in redux since the login phase
	}, [])
	return (
		<div>
			<div className={classes.header}>
				<h1>Welcome {auth.name}</h1>
			</div>
		</div>
	)
}

// DashBoard.propTypes = {}
const mapStateToProps = state => ({
	auth: state.auth
})
export default connect(mapStateToProps)(DashBoard)
