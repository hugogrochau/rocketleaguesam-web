/*
 *
 * Players reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PLAYERS_FETCH_SUCCEEDED,
  CHANGE_ORDER,
} from './constants';

const initialState = fromJS({
  orderColumn: 'sum',
});

function playersReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYERS_FETCH_SUCCEEDED:
      return state.set('players', action.players);
    case CHANGE_ORDER:
      return state.set('orderColumn', action.columnName);
    default:
      return state;
  }
}

export default playersReducer;
