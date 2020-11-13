import { combineReducers } from 'redux'
import menuBuilderReducer from './menuBuilder'
const rootReducer = combineReducers({
	menuBuilder: menuBuilderReducer
})

export default rootReducer
