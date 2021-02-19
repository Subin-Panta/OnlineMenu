import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../../store/actions/auth'
import classes from './Navbar.module.css'
const Navbar = ({ auth, logout }) => {
	const logoutHandler = () => {
		const CSRFtoken = localStorage.getItem('CSRF token')

		logout(CSRFtoken)
	}
	const conditionalRendering = () => {
		if (auth.verified) {
			return <div onClick={logoutHandler}>Log out</div>
		} else {
			return (
				<Link className={classes.link} to='/adminLogin'>
					Admin
				</Link>
			)
		}
	}
	return (
		<nav className={classes.navbar}>
			<ul>
				<li>
					<NavLink
						to='/'
						exact
						isActive={(match, location) => {
							if (
								location.pathname === '/checkout' ||
								location.pathname === '/'
							) {
								return true
							}
						}}
						className={classes.nav}
						activeClassName={classes.acnav}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						to='/customerSupport'
						className={classes.nav}
						activeClassName={classes.acnav}
					>
						Customer Support
					</NavLink>
				</li>
				<li className={classes.dashboard}>
					{auth.verified ? (
						<NavLink
							exact
							to='/dashboard'
							className={classes.nav}
							activeClassName={classes.acnav}
						>
							Dashboard
						</NavLink>
					) : null}
				</li>
			</ul>

			<div className={classes.login}>{conditionalRendering()}</div>
		</nav>
	)
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps, { logout })(Navbar)
