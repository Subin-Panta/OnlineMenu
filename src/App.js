import React from 'react'
import Navbar from './components/Layout/Navbar/Navbar'
import Home from './components/Home/Home'
import { Switch, Route } from 'react-router-dom'
import CustomerSupport from './components/CustomerSupport/CustomerSupport'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Checkout from './components/Checkout/Checkout'
import Login from './components/AdminPage/Login'
import SingleItem from './components/SingleItem/SingleItem'
import PrivateRoute from './components/hoc/PrivateRouting/PrivateRoute'
import DashBoard from './components/AdminPage/DashBoard/DashBoard'
import { connect } from 'react-redux'
import { checkToken } from './store/actions/auth'
const App = ({ checkToken }) => {
	const token = localStorage.getItem('CSRF token')
	if (token) {

		checkToken(token)
		//Fire an action that sends a post request to verifyToken
	}
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/customerSupport' component={CustomerSupport} />
				<Route exact path='/checkout' component={Checkout} />
				<Route exact path='/adminLogin' component={Login} />
				<Route exact path='/menuItems/:name' component={SingleItem} />
				<PrivateRoute exact path='/dashboard' component={DashBoard} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	)
}

export default connect(null, {
	checkToken
})(App)
