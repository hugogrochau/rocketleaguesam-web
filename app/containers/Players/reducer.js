/*
 *
 * Players reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PLAYERS_FETCH_SUCCEEDED,
  CHANGE_ORDER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from './constants';

const initialState = fromJS({
  orderColumn: 'sum',
  page: 0,
});

function playersReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYERS_FETCH_SUCCEEDED:
      return state.set('players', action.players);
    case CHANGE_ORDER:
      return state.set('orderColumn', action.columnName);
    case NEXT_PAGE:
      return state.set('page', state.get('page') + 1);
    case PREVIOUS_PAGE:
      return state.set('page', state.get('page') - 1);
    default:
      return state;
  }
}

export default playersReducer;
