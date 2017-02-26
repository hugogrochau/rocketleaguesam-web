import {
  SET_TEAM,
  FETCH_TEAM,
  FETCH_TEAM_FAILED,
} from './constants';

export const setTeam = (team) => ({ type: SET_TEAM, team });

export const fetchTeam = (id) => ({ type: FETCH_TEAM, id });

export const fetchTeamFailed = () => ({ type: FETCH_TEAM_FAILED });
