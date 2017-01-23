/*
 *
 * Teams actions
 *
 */


import {
  TEAMS_FETCH_REQUESTED,
  TEAMS_FETCH_SUCCEEDED,
  TEAMS_FETCH_FAILED,
} from './constants';

export function fetchTeams() {
  return {
    type: TEAMS_FETCH_REQUESTED,
  };
}

export function teamsFetchSucceeded(teams) {
  return {
    type: TEAMS_FETCH_SUCCEEDED,
    teams,
  };
}

export function teamsFetchFailed(message) {
  return {
    type: TEAMS_FETCH_FAILED,
    message,
  };
}
