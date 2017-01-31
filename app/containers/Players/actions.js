import {
  PLAYERS_FETCH_REQUESTED,
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED,
  PLAYER_SEARCH,
  CHANGE_ORDER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  CHANGE_SIZE_SMALL,
  CHANGE_SIZE_LARGE,
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

export function playerSearch(text) {
  return {
    type: PLAYER_SEARCH,
    text,
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

export function changeSize(small) {
  return {
    type: small ? CHANGE_SIZE_SMALL : CHANGE_SIZE_LARGE,
  };
}
