import { call, put, take, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import fetch from 'isomorphic-fetch';
import pick from 'lodash/pick';
import { PLAYERS_FETCH_REQUESTED, PLAYER_COLUMNS, PLAYERS_FETCH_FAILED, PLAYERS_FETCH_SUCCEEDED } from './constants';
import { playersFetchSucceeded, playersFetchFailed } from './actions';

/* eslint-disable no-constant-condition */

const sumPlayerRanks = (player) => player['1v1'] + player['2v2'] + player['3v3'] + player['3v3s'];

const playerUrl = `${API_URL}/v1/player`;

export function* fetchPlayersFromApi() {
  try {
    const res = yield call(fetch, playerUrl);
    /* Delete unneeded columns and calculate rank sum */
    const jsonData = yield call([res, res.json]);

    /* Filter columns and sum ranks */
    const players = jsonData.data.map((x) =>
      Object.assign(
        pick(x, PLAYER_COLUMNS.map((c) => c.name), 'id'),
        { sum: sumPlayerRanks(x) })
    );
    yield put(playersFetchSucceeded(players));
  } catch (e) {
    yield put(playersFetchFailed(e.message));
  }
}

export function* takePlayersFetchRequest() {
  while (true) {
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
