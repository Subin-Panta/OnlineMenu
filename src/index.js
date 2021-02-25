import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/index'
import reportWebVitals from './reportWebVitals'

const composeEnhancers =
	(nodeEnv !== 'production' &&
		typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
