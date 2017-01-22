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
    const players = playerState.get('players').map((p) => {
      const profileLink = `/player/${p.get('platform')}/${p.get('id')}`;
      const platformImage = `${CDN_URL}/${p.get('platform')}.svg`;
      return p.merge({ profileLink, platformImage });
    }).toJS();

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
