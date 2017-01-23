import {
  fetchTeams,
  teamsFetchFailed,
  teamsFetchSucceeded,
} from '../actions';
import {
  TEAMS_FETCH_REQUESTED,
  TEAMS_FETCH_FAILED,
  TEAMS_FETCH_SUCCEEDED,
} from '../constants';

describe('Teams actions', () => {
  describe('fetchTeams Action', () => {
    it('has a type of PLAYERS_FETCH_REQUESTED', () => {
      const expected = {
        type: TEAMS_FETCH_REQUESTED,
      };
      expect(fetchTeams()).toEqual(expected);
    });
  });

  describe('teamsFetchFailed Action', () => {
    it('has a type of TEAMS_FETCH_FAILED', () => {
      const expected = {
        type: TEAMS_FETCH_FAILED,
      };
      expect(teamsFetchFailed()).toEqual(expected);
    });
  });

  describe('teamsFetchSucceeded Action', () => {
    it('has a type of TEAMS_FETCH_SUCCEEDED', () => {
      const expected = {
        type: TEAMS_FETCH_SUCCEEDED,
      };
      expect(teamsFetchSucceeded()).toEqual(expected);
    });
  });
});
