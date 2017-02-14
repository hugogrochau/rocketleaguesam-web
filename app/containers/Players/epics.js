import { Observable } from 'rxjs/Observable';
import { PLAYERS_FETCH_REQUESTED, PLAYER_SEARCH_TYPE } from './constants';
import { playersFetchSucceeded, playersFetchFailed, playerSearch } from './actions';

const generateExtraColumns = (p) => {
  const profileLink = `/player/${p.platform}/${p.id}`;
  const platformImage = `${CDN_URL}/${p.platform}.svg`;
  return { ...p, profileLink, platformImage };
};

const getPlayerSettings = (store) => ({
  page: store.get('page'),
  pageSize: 20,
  orderBy: store.get('orderBy'),
});

const fetchPlayersEpic = (action$, { getState }, api) =>
  action$.ofType(PLAYERS_FETCH_REQUESTED)
    .map(() => getPlayerSettings(getState().get('players')))
    .mergeMap(api.player.all)
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
