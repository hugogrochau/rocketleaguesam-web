import { createSelector } from 'reselect';

/**
 * Direct selector to the teams state domain
 */
const selectTeam = (state) => state.get('team');

/**
 * Other specific selectors
 */
const makeSelectTeam = () => createSelector(
  [selectTeam],
  (teamState) => teamState.get('team').toJS()
);

const makeSelectFetchingTeam = () => createSelector(
  [selectTeam],
  (teamState) => teamState.get('fetchingTeam')
);

const makeSelectFailedTeamFetch = () => createSelector(
  [selectTeam],
  (teamState) => teamState.get('failedTeamFetch')
);
/**
 * Default selector used by Teams
 */
const makeSelectTeamState = () => createSelector(
  selectTeam,
  (teamState) => teamState
);

export default makeSelectTeamState;

export {
  selectTeam,
  makeSelectTeam,
  makeSelectFetchingTeam,
  makeSelectFailedTeamFetch,
};
