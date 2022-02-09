import { combineReducers } from 'redux'
import userReducer from './user'
import repositoryReducer from './repository'

const rootReducer = combineReducers({
    userReducer,
    repositoryReducer,
})

export default rootReducer