import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/fromPromise';

import { PLAYERS_FETCH_REQUESTED, PLAYER_SEARCH_TYPE } from './constants';
import { playersFetchSucceeded, playersFetchFailed, playerSearch } from './actions';

const generateExtraColumns = (p) => {
  const profileLink = `/player/${p.platform}/${p.id}`;
  const platformImage = `${CDN_URL}/${p.platform}.svg`;
  return { ...p, profileLink, platformImage };
};

const fetchPlayersEpic = (action$, { getState }, api) =>
  action$.ofType(PLAYERS_FETCH_REQUESTED)
    .mergeMap(() => api.player.all({ pageSize: 1000 }))
    .map((response) => response.data.players)
    .map((players) => players.map((p) => generateExtraColumns(p)))
    .map((players) => playersFetchSucceeded(players))
    .catch((err) => Observable.of(playersFetchFailed(err.data)));

const playerSearchTypeEpic = (action$) =>
  action$.ofType(PLAYER_SEARCH_TYPE)
    .distinctUntilChanged()
    .debounceTime(300)
    .map((action) => action.text)
    .map((text) => playerSearch(text));


export default [
  fetchPlayersEpic,
  playerSearchTypeEpic,
];
