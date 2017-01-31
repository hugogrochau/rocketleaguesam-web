import {
  TEAMS_FETCH_REQUESTED,
  TEAMS_FETCH_SUCCEEDED,
  TEAMS_FETCH_FAILED,
} from './constants';

export const fetchTeams = () => ({ type: TEAMS_FETCH_REQUESTED });

export const teamsFetchSucceeded = (teams) => ({ type: TEAMS_FETCH_SUCCEEDED, teams });

export const teamsFetchFailed = (message) => ({ type: TEAMS_FETCH_FAILED, message });
