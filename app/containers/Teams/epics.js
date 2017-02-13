import { Observable } from 'rxjs/Observable';
import { TEAMS_FETCH_REQUESTED } from './constants';
import { teamsFetchSucceeded, teamsFetchFailed } from './actions';

const fetchTeamsEpic = (action$, store, api) =>
  action$.ofType(TEAMS_FETCH_REQUESTED)
    .mergeMap(api.team.all)
    .map((response) => response.data.teams)
    .map((teams) => teamsFetchSucceeded(teams))
    .catch((err) => Observable.of(teamsFetchFailed(err.data)));

export default [
  fetchTeamsEpic,
];
