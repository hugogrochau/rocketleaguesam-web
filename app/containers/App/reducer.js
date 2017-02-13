import { fromJS } from 'immutable';
import {
  TOGGLE_DRAWER,
  CHANGE_SIZE_SMALL,
  CHANGE_SIZE_LARGE,
} from './constants';

const initialState = fromJS({
  drawerOpen: false,
  small: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return state.set('drawerOpen', !state.get('drawerOpen'));
    case CHANGE_SIZE_SMALL:
      return state.set('small', true);
    case CHANGE_SIZE_LARGE:
      return state.set('small', false);
    default:
      return state;
  }
}

export default appReducer;
