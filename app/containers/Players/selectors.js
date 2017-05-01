import { createSelector } from 'reselect';
import fuzzy from 'fuzzy';
import { PLAYER_COLUMNS } from './constants';
import { makeSelectIsSmall } from '../../containers/App/selectors';

/**
 * Direct selector to the players state domain
 */
const selectPlayers = (state) => state.get('players');

/**
 * Other specific selectors
 */
const makeSelectPlayers = () => createSelector(
  [selectPlayers, makeSelectOrderBy(), makeSelectPlayerSearch()],
  (playerState, orderColumn, playerSearch) => {
    let players = playerState.get('players')
      .sort((a, b) => b.get(orderColumn) - a.get(orderColumn)) // order players by orderColumn
      .map((p, i) => p.set('#', i + 1)); // Add rank number

    if (playerSearch) { // Filter by search term
      players = players.filter((p) => fuzzy.match(playerSearch, p.get('name') || ''));
    }

    return players.toJS();
  }
);

const makeSelectColumns = () => createSelector(
  [makeSelectIsSmall(), makeSelectOrderBy()],
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

const makeSelectOrderBy = () => createSelector(
  selectPlayers,
  (playerState) => playerState.get('orderBy')
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
  makeSelectOrderBy,
  makeSelectPage,
  makeSelectColumns,
};
