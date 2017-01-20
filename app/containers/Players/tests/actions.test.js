
import {
  fetchPlayers,
} from '../actions';
import {
  PLAYERS_FETCH_REQUESTED,
} from '../constants';

describe('Players actions', () => {
  describe('fetchPlayers Action', () => {
    it('has a type of PLAYERS_FETCH_REQUESTED', () => {
      const expected = {
        type: PLAYERS_FETCH_REQUESTED,
      };
      expect(fetchPlayers()).toEqual(expected);
    });
  });
});
