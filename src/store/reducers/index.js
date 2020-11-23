import { combineReducers } from 'redux'
import menuBuilderReducer from './menuBuilder'
import orderBuilderReducer from './orderBuilder'
const rootReducer = combineReducers({
	menuBuilder: menuBuilderReducer,
	orderBuilder: orderBuilderReducer
})

export default rootReducer
