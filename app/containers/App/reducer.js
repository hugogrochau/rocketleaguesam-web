import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  TOGGLE_DRAWER,
  CHANGE_SIZE_SMALL,
  CHANGE_SIZE_LARGE,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGING_IN,
  LOG_OUT,
} from './constants';

const initialState = fromJS({
  isLoggingIn: false,
  drawerOpen: false,
  logged: false,
  small: false,
  player: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return state.set('drawerOpen', !state.get('drawerOpen'));
    case CHANGE_SIZE_SMALL:
      return state.set('small', true);
    case CHANGE_SIZE_LARGE:
      return state.set('small', false);
    case LOCATION_CHANGE:
      return state.set('drawerOpen', false);
    case LOGIN_SUCCESS:
      return state.merge({
        isLoggingIn: false,
        logged: true,
        player: action.player,
      });
    case LOGIN_ERROR:
      return state.merge({
        isLoggingIn: false,
        loginErrorMessage: action.message,
      });
    case LOGGING_IN:
      return state.set('isLoggingIn', true);
    case LOG_OUT:
      localStorage.removeItem('token');
      return state.merge({
        logged: false,
        player: {},
      });
    default:
      return state;
  }
}

export default appReducer;
