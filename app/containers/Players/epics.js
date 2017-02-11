import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import { PLAYERS_FETCH_REQUESTED } from './constants';
import { playersFetchSucceeded, playersFetchFailed } from './actions';

const playerUrl = `${API_URL}/v1/player`;

const generateExtraColumns = (p) => {
  const profileLink = `/player/${p.platform}/${p.id}`;
  const platformImage = `${CDN_URL}/${p.platform}.svg`;
  return Object.assign(p, { profileLink, platformImage });
};

const fetchUsersEpic = (action$) =>
  action$.ofType(PLAYERS_FETCH_REQUESTED)
    .mergeMap(() =>
      ajax.getJSON(playerUrl)
        .map((response) => {
          const players = response.data.players.map((p) => generateExtraColumns(p));
          return playersFetchSucceeded(players);
        })
        .retryWhen((errors) => errors.scan((count, err) => {
          if (count >= 4) {
            throw err;
          }
          return count + 1;
        }, 0).delay(1000))
        .catch((err) => Observable.of(playersFetchFailed(err.message)))
    );

export default [
  fetchUsersEpic,
];
