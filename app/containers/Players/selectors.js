import { createSelector } from 'reselect';
import fuzzy from 'fuzzy';

/**
 * Direct selector to the players state domain
 */
const selectPlayers = (state) => state.get('players');

/**
 * Other specific selectors
 */
const makeSelectPlayers = () => createSelector(
  [selectPlayers, makeSelectOrderColumn(), makeSelectPlayerSearch()],
  (playerState, orderColumn, playerSearch) => {
    let players = playerState.get('players')
      .sort((a, b) => b.get(orderColumn) - a.get(orderColumn))
      .map((p, i) => p.set('index', i + 1));
    if (playerSearch) {
      players = players.filter((p) => fuzzy.match(playerSearch, p.get('name')));
    }
    return players.toJS();
  }
);
const makeSelectPlayerSearch = () => createSelector(
  selectPlayers,
  (playerState) => playerState.get('playerSearch')
);

const makeSelectOrderColumn = () => createSelector(
  selectPlayers,
  (playerState) => playerState.get('orderColumn')
);

const makeSelectPage = () => createSelector(
  selectPlayers,
  (playerState) => playerState.get('page')
);

/**
 * Default selector used by Players
 */
const makeSelectPlayersState = () => createSelector(
    selectPlayers,
    (playerState) => playerState
  );

export default makeSelectPlayersState;

export {
  selectPlayers,
  makeSelectPlayers,
  makeSelectPlayerSearch,
  makeSelectOrderColumn,
  makeSelectPage,
};
