import { combineReducers } from 'redux'
import playersReducer from './containers/Players/reducer'

export default combineReducers({
  players: playersReducer,
})
