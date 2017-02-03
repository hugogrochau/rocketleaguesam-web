import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import { TEAMS_FETCH_REQUESTED } from './constants';
import { teamsFetchSucceeded, teamsFetchFailed } from './actions';

const teamUrl = `${API_URL}/v1/team`;

const fetchTeamsEpic = (action$) =>
  action$.ofType(TEAMS_FETCH_REQUESTED)
    .mergeMap(() =>
      ajax.getJSON(teamUrl)
        .map((response) => teamsFetchSucceeded(response.data.teams))
        .retryWhen((errors) => errors.scan((count, err) => {
          if (count >= 4) {
            throw err;
          }
          return count + 1;
        }, 0).delay(1000))
        .catch((err) => Observable.of(teamsFetchFailed(err.message)))
    );

export default [
  fetchTeamsEpic,
];
