import { fromJS } from 'immutable';
import {
  TOGGLE_DRAWER,
} from './constants';

const initialState = fromJS({
  drawerOpen: false,
});

function mainAppBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return state.set('drawerOpen', !state.get('drawerOpen'));
    default:
      return state;
  }
}

export default mainAppBarReducer;
