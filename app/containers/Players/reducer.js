/*
 *
 * Players reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PLAYERS_FETCH_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  players: [],
});

// TODO use immutable.js
function playersReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYERS_FETCH_SUCCEEDED:
      return state.set('players', action.players);
    default:
      return state;
  }
}

export default playersReducer;
