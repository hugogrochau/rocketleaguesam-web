/*
 *
 * Players actions
 *
 */

import {
  PLAYERS_FETCH_REQUESTED,
  CHANGE_ORDER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from './constants';

export function fetchPlayers() {
  return {
    type: PLAYERS_FETCH_REQUESTED,
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
