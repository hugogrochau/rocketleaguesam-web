import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { FETCH_TEAM } from './constants';
import { setTeam, fetchTeamFailed } from './actions';

const fetchTeamEpic = (action$, store, api) =>
  action$.ofType(FETCH_TEAM)
    .mergeMap(({ id }) => api.team.get({ id }))
    .map((response) => response.data.team)
    .map((team) => setTeam(team))
    .catch((err) => Observable.of(fetchTeamFailed(err.data)));

export default [
  fetchTeamEpic,
];
