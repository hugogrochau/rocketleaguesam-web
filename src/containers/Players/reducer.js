import {
  PLAYERS_FETCH_SUCCEEDED,
  CHANGE_SORT,
  DECRESCENT,
} from './constants'
import { sortPlayers } from './utils'

const initialState = {
  players: [],
  sortPlaylist: 'sum',
  sortOrder: DECRESCENT,
  failed: false,
}

export default function playersReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SORT:
      return Object.assign({}, state, {
        players: sortPlayers(state.players, action.playlist, !state.sortOrder),
        sortPlaylist: action.playlist,
        sortOrder: !state.sortOrder,
      })
    case PLAYERS_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        /* calculate ranks sum */
        players: action.players,
      })
    default: return state
  }
}
