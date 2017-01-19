/*
 *
 * Players actions
 *
 */

import {
  PLAYERS_FETCH_REQUESTED,
} from './constants';

export function fetchPlayers() {
  return {
    type: PLAYERS_FETCH_REQUESTED,
  };
}
