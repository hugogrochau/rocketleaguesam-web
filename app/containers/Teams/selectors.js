import { createSelector } from 'reselect';

/**
 * Direct selector to the teams state domain
 */
const selectTeamsDomain = () => (state) => state.get('teams');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Teams
 */

const makeSelectTeams = () => createSelector(
  selectTeamsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTeams;
export {
  selectTeamsDomain,
};
