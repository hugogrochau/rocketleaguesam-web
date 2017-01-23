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
  (teamState) => {
    const teams = teamState.get('teams').map((t) => {
      /* sort players by rank sum */
      const players = t.get('players').sort((a, b) => b.get('sum') - a.get('sum'));

      /* calculate team sum */
      const sum = players.reduce((a, b) => a + b.get('sum'), 0);

      /* add the average to the team and update the players with the ordered version */
      return t.set('average', Math.round(sum / players.size))
        .set('players', players);
    }).toJS();

    teams.sort((a, b) => b.average - a.average);

    return teams;
  }
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
