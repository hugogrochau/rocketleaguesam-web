import { createSelector } from 'reselect';

/**
 * Direct selector to the players state domain
 */
const selectPlayers = (state) => state.get('players');

/**
 * Other specific selectors
 */
const makeSelectPlayers = () => createSelector(
  [selectPlayers, makeSelectOrderColumn()],
  (playerState, orderColumn) => {
    const players = playerState.get('players', []);
    players.sort((a, b) => b[orderColumn] - a[orderColumn]);

    return players;
  }
);

const makeSelectOrderColumn = () => createSelector(
  selectPlayers,
  (playerState) => playerState.get('orderColumn')
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
  makeSelectOrderColumn,
  makeSelectPlayers,
};
