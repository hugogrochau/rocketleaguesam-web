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
    players.forEach((p, i, c) => {
      const player = c[i];
      player.profileLink = `/player/${p.platform}/${p.id}`;
      player.platformImage = `${CDN_URL}/${p.platform}.svg`;
    });
    players.sort((a, b) => b[orderColumn] - a[orderColumn]);

    return players;
  }
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
  makeSelectOrderColumn,
  makeSelectPage,
};
