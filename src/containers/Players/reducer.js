import {
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED,
  CHANGE_SORT
} from './constants';
import { sortPlayers } from './utils';

const initialState = {
  players: [],
  sortPlaylist: -1,
  sortOrder: 0,
  failed: false
};

export default function playersReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SORT:
      return Object.assign({}, state, {
        players: sortPlayers(state.players, action.playlist, !state.sortOrder),
        sortPlaylist: action.playlist,
        sortOrder: !state.sortOrder
      });
    case PLAYERS_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        /* calculate ranks sum */
        players: action.players
      });
    case PLAYERS_FETCH_FAILED:
      return Object.assign({}, state, {
        failed: true
      });
  }
  return state;
}
