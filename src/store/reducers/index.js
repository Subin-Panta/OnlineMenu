import { combineReducers } from 'redux'
import menuBuilderReducer from './menuBuilder'
import orderBuilderReducer from './orderBuilder'
import errorReducer from './error'
import authReducer from './auth'

const rootReducer = combineReducers({
	menuBuilder: menuBuilderReducer,
	orderBuilder: orderBuilderReducer,
	error: errorReducer,
	auth: authReducer
})

export default rootReducer
