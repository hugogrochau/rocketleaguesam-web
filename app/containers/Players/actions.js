/*
 *
 * Players actions
 *
 */

import {
  PLAYERS_FETCH_REQUESTED,
  CHANGE_ORDER,
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
