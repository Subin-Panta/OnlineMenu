import React from 'react'
import { connect } from 'react-redux'
import Container from '../Container/Container'
import Contents from '../Contents/Contents'
import classes from './DashBoard.module.css'
// import PropTypes from 'prop-types'

const DashBoard = ({ auth }) => {
	return (
		<div>
			<div className={classes.header}>
				<h1>Welcome {auth.name}</h1>
				<Container>
					<Contents />
				</Container>
			</div>
		</div>
	)
}

// DashBoard.propTypes = {}
const mapStateToProps = state => ({
	auth: state.auth
})
export default connect(mapStateToProps)(DashBoard)
