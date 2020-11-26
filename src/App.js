import React from 'react'
import Navbar from './components/Layout/Navbar/Navbar'
import Home from './components/Home/Home'
import { Switch, Route } from 'react-router-dom'
import CustomerSupport from './components/CustomerSupport/CustomerSupport'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Checkout from './components/Checkout/Checkout'
import Login from './components/AdminPage/Login'
const App = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/customerSupport' component={CustomerSupport} />
				<Route exact path='/checkout' component={Checkout} />
				<Route exact path='/adminLogin' component={Login} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	)
}

export default App
