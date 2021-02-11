import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'
const Navbar = () => {
	const logo = (
		<svg
			width='68'
			height='66'
			viewBox='0 0 68 66'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M34 66C52.7777 66 68 51.2254 68 33C68 14.7746 52.7777 0 34 0C15.2223 0 0 14.7746 0 33C0 51.2254 15.2223 66 34 66ZM55.5923 10.0074L46.8824 10L33.4648 23.4151L20.0595 10.0074L11.3423 10L11.3496 18.6828L24.7721 32.1053L17.8224 39.0575L14.3463 35.5839L10.8703 39.06L16.9546 45.1419L10 52.099L13.4761 55.575L20.4307 48.6204L26.5151 54.7048L29.9912 51.2287L26.5126 47.7502L33.4648 40.798L40.4194 47.7502L36.9433 51.2287L40.4194 54.7048L46.5038 48.6204L53.4584 55.575L56.9345 52.099L49.9823 45.1443L56.0642 39.06L52.5882 35.5839L49.1096 39.06L42.1575 32.1053L55.5972 18.6681L55.5923 10.0074ZM23.039 44.2716L21.2985 42.5336L28.2482 35.5814H28.2507L29.9887 37.3195L23.039 44.2716ZM48.9154 14.9191H50.678V16.6326L38.6789 28.6268L36.9433 26.8887L48.9154 14.9191ZM16.2614 16.64V14.9191L18.0191 14.9216L45.6335 42.536L43.8955 44.2741L16.2614 16.64Z'
				fill='black'
			/>
		</svg>
	)
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>{logo}</div>
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
				<li>
					<NavLink exact to='/dashboard'>
						Dummy
					</NavLink>
				</li>
			</ul>
			<div className={classes.login}>
				<Link className={classes.link} to='/adminLogin'>
					Admin
				</Link>
			</div>
		</nav>
	)
}

export default Navbar
