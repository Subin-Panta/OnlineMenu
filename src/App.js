import React, { Suspense, lazy } from 'react'
import Navbar from './components/Layout/Navbar/Navbar'
import Home from './components/Home/Home'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkToken } from './store/actions/auth'
const CustomerSupport = lazy(() =>
	import('./components/CustomerSupport/CustomerSupport')
)
const PageNotFound = lazy(() =>
	import('./components/PageNotFound/PageNotFound')
)
const Checkout = lazy(() => import('./components/Checkout/Checkout'))
const Login = lazy(() => import('./components/AdminPage/Login'))
const SingleItem = lazy(() => import('./components/SingleItem/SingleItem'))
const PrivateRoute = lazy(() =>
	import('./components/hoc/PrivateRouting/PrivateRoute')
)
const DashBoard = lazy(() =>
	import('./components/AdminPage/DashBoard/DashBoard')
)
const EditMenu = lazy(() => import('./components/AdminPage/EditMenu/EditMenu'))
const Orders = lazy(() => import('./components/AdminPage/Orders/Orders'))
const SignUp = lazy(() => import('./components/SignUp/SignUp'))

const App = ({ checkToken }) => {
	const token = localStorage.getItem('CSRF token')
	if (token) {
		checkToken(token)
		//Fire an action that sends a post request to verifyToken
	}
	return (
		<div>
			<Navbar />
			<Suspense fallback={<h1>Loading...</h1>}>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route
						exact
						path='/customerSupport'
						render={() => <CustomerSupport />}
					/>
					<Route exact path='/checkout' component={Checkout} />
					<Route exact path='/adminLogin' component={Login} />
					<Route exact path='/menuItems/:name' component={SingleItem} />
					<PrivateRoute exact path='/dashboard' component={DashBoard} />
					<PrivateRoute exact path='/modify' component={EditMenu} />
					<PrivateRoute exact path='/orders' component={Orders} />
					<PrivateRoute exact path='/signUp' component={SignUp} />
					<Route component={PageNotFound} />
				</Switch>
			</Suspense>
		</div>
	)
}

export default connect(null, {
	checkToken
})(App)
