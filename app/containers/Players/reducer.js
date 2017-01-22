/*
 *
 * Players reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED,
  CHANGE_ORDER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from './constants';

const initialState = fromJS({
  orderColumn: 'sum',
  page: 0,
  players: [],
});

function playersReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYERS_FETCH_SUCCEEDED:
      return state.set('players', fromJS(action.players));
    case PLAYERS_FETCH_FAILED:
      return state.set('failedPlayerFetch', true);
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
