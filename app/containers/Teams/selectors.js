import { createSelector } from 'reselect';

/**
 * Direct selector to the teams state domain
 */
const selectTeams = (state) => state.get('teams');

/**
 * Other specific selectors
 */
const makeSelectTeams = () => createSelector(
  [selectTeams],
  (teamState) => teamState.get('teams').toJS()
);

/**
 * Default selector used by Teams
 */
const makeSelectTeamsState = () => createSelector(
  selectTeams,
  (teamState) => teamState
);

export default makeSelectTeamsState;

export {
  selectTeams,
  makeSelectTeams,
};
