import { Observable } from 'rxjs/Observable';
import { PLAYERS_FETCH_REQUESTED } from './constants';
import { playersFetchSucceeded, playersFetchFailed } from './actions';

const generateExtraColumns = (p) => {
  const profileLink = `/player/${p.platform}/${p.id}`;
  const platformImage = `${CDN_URL}/${p.platform}.svg`;
  return { ...p, profileLink, platformImage };
};

const fetchUsersEpic = (action$, store, api) =>
  action$.ofType(PLAYERS_FETCH_REQUESTED)
    .mergeMap(api.player.all)
    .map((response) => response.data.players)
    .map((players) => players.map((p) => generateExtraColumns(p)))
    .map((players) => playersFetchSucceeded(players))
    .catch((err) => Observable.of(playersFetchFailed(err.data)));

export default [
  fetchUsersEpic,
];
