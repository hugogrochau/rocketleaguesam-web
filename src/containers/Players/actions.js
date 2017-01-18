import {
  CHANGE_SORT,
  PLAYERS_FETCH_REQUESTED
} from './constants'

export function changeSort(playlist) {
  return {
    type: CHANGE_SORT,
    playlist: playlist
  }
}

export function fetchPlayers() {
  return {
    type: PLAYERS_FETCH_REQUESTED,
  }
}

