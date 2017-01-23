import {
  PLAYERS_FETCH_REQUESTED,
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED,
  CHANGE_ORDER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from './constants';

export function fetchPlayers() {
  return {
    type: PLAYERS_FETCH_REQUESTED,
  };
}

export function playersFetchSucceeded(players) {
  return {
    type: PLAYERS_FETCH_SUCCEEDED,
    players,
  };
}

export function playersFetchFailed(message) {
  return {
    type: PLAYERS_FETCH_FAILED,
    message,
  };
}

export function orderPlayers(columnName) {
  return {
    type: CHANGE_ORDER,
    columnName,
  };
}

export function changePage(forward) {
  return {
    type: forward ? NEXT_PAGE : PREVIOUS_PAGE,
  };
}
