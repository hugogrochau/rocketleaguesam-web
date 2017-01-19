import { createSelector } from 'reselect';

/**
 * Direct selector to the players state domain
 */
const selectPlayersDomain = () => (state) => state.get('players');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Players
 */

const makeSelectPlayers = () => createSelector(
  selectPlayersDomain(),
  (substate) => substate.toJS().players
);

export default makeSelectPlayers;
export {
  selectPlayersDomain,
};
