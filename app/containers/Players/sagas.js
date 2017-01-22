import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
/* TODO: use fetch and remove this */
import request from 'superagent';
import pick from 'lodash/pick';
import { PLAYERS_FETCH_REQUESTED, PLAYER_COLUMNS } from './constants';
import { playersFetchSucceeded, playersFetchFailed, fetchPlayers } from './actions';

const sumPlayerRanks = (player) =>
  player['1v1'] + player['2v2'] + player['3v3'] + player['3v3s'];

const playerUrl = `${API_URL}/v1/player`;

export function* fetchPlayersFromApi() {
  try {
    const res = yield call(() => request(playerUrl));
    /* Delete unneeded columns and calculate rank sum */
    const players = res.body.data.map((x) =>
      Object.assign(
        pick(x, PLAYER_COLUMNS.map((c) => c.name), 'id'),
        { sum: sumPlayerRanks(x) })
    );
    yield put(playersFetchSucceeded(players));
  } catch (e) {
    yield put(playersFetchFailed(e.message));
    /* try again */
    yield call(delay, 3000);
    yield put(fetchPlayers());
  }
}

export function* takeEveryPlayersFetchRequest() {
  yield takeEvery(PLAYERS_FETCH_REQUESTED, fetchPlayersFromApi);
}

export default [
  takeEveryPlayersFetchRequest,
];
