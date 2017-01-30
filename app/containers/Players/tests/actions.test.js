import {
  fetchPlayers,
  orderPlayers,
  playerSearch,
  changePage,
} from '../actions';
import {
  PLAYERS_FETCH_REQUESTED,
  PLAYER_SEARCH,
  CHANGE_ORDER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
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

  describe('playerSearch Action', () => {
    it('has a type of PLAYER_SEARCH', () => {
      const expected = {
        type: PLAYER_SEARCH,
      };
      expect(playerSearch()).toEqual(expected);
    });
  });

  describe('orderPlayers Action', () => {
    it('has a type of CHANGE_ORDER', () => {
      const expected = {
        type: CHANGE_ORDER,
        columnName: '1v1',
      };
      expect(orderPlayers('1v1')).toEqual(expected);
    });
  });

  describe('changePage Action', () => {
    it('has a type of NEXT_PAGE when forwards', () => {
      const expected = {
        type: NEXT_PAGE,
      };
      expect(changePage(true)).toEqual(expected);
    });

    it('has a type of PREVIOUS_PAGE when not forwards', () => {
      const expected = {
        type: PREVIOUS_PAGE,
      };
      expect(changePage(false)).toEqual(expected);
    });
  });
});
