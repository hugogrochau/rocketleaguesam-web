import { call, put, take, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import fetch from 'isomorphic-fetch';
import { PLAYERS_FETCH_REQUESTED, PLAYERS_FETCH_FAILED, PLAYERS_FETCH_SUCCEEDED } from './constants';
import { playersFetchSucceeded, playersFetchFailed } from './actions';


const playerUrl = `${API_URL}/v1/player`;

export function* fetchPlayersFromApi() {
  try {
    const res = yield call(fetch, playerUrl);
    /* Delete unneeded columns and calculate rank sum */
    const jsonData = yield call([res, res.json]);

    yield put(playersFetchSucceeded(jsonData.data.players));
  } catch (e) {
    yield put(playersFetchFailed(e.message));
  }
}

export function* takePlayersFetchRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(PLAYERS_FETCH_REQUESTED);
    yield fork(fetchPlayersFromApi);
    /* retry up to five times */
    for (let i = 0; i < 5; i += 1) {
      const result = yield take([PLAYERS_FETCH_FAILED, PLAYERS_FETCH_SUCCEEDED]);
      if (result.type === PLAYERS_FETCH_FAILED) {
        yield call(delay, 3000);
        yield fork(fetchPlayersFromApi);
      } else {
        break;
      }
    }
  }
}

export default [
  takePlayersFetchRequest,
];
