import { createSelector } from 'reselect';
import fuzzy from 'fuzzy';
import { PLAYER_COLUMNS } from './constants';

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
      .sort((a, b) => b.get(orderColumn) - a.get(orderColumn)) // order players by orderColumn
      .map((p, i) => p.set('#', i + 1)); // Add rank number

    if (playerSearch) { // Filter by search term
      players = players.filter((p) => fuzzy.match(playerSearch, p.get('name')));
    }

    return players.toJS();
  }
);

const makeSelectColumns = () => createSelector(
  [makeSelectIsSmallScreen(), makeSelectOrderColumn()],
  (isSmallScreen, orderColumn) => {
    if (isSmallScreen) {
      const smallColumns = ['name', 'platform', 'profileLink', 'platformImage', orderColumn];
      return PLAYER_COLUMNS.filter((c) => smallColumns.includes(c.name));
    }

    return PLAYER_COLUMNS;
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

const makeSelectIsSmallScreen = () => createSelector(
  selectPlayers,
  (playerState) => playerState.get('small')
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
  makeSelectIsSmallScreen,
  makeSelectColumns,
};
