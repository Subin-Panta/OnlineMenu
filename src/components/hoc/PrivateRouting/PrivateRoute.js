import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../../UI/spinner/Spinner'
import PropTypes from 'prop-types'
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	// console.log(1, !auth.verified && !auth.loading)
	// console.log(2, !auth.verified && auth.loading)
	// console.log(3, auth.verified && !auth.loading)
	return (
		<Route
			{...rest}
			render={props =>
				!auth.verified && !auth.loading ? (
					<Redirect to='/adminLogin' />
				) : !auth.verified && auth.loading ? (
					<Redirect to='/adminLogin' />
				) : auth.verified && !auth.loading ? (
					<Component {...props} />
				) : null
			}
		/>
	)
}

PrivateRoute.propTypes = { auth: PropTypes.object.isRequired }
const mapStateToProps = state => ({
	auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)
