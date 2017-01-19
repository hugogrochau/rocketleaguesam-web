import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import _ from 'lodash';
/* TODO: use fetch and remove this */
import request from 'superagent';
import {
  PLAYERS_FETCH_REQUESTED,
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED,
  PLAYER_COLUMNS
} from './constants';

const sumPlayerRanks = (player) =>
  player['1v1'] + player['2v2'] + player['3v3'] + player['3v3s'];

/* TODO: Make a client for my API */
const playerUrl = 'http://127.0.0.1:8080/api/v1/player';

export function* fetchPlayers() {
  try {
    const res = yield call(() => request(playerUrl));
    /* Delete unneeded columns and calculate rank sum */
    const players = res.body.data.map((x) =>
      /* TODO: clean this */
      Object.assign(
        _.pick(x, PLAYER_COLUMNS),
        { sum: sumPlayerRanks(x) }
      )
    );
    yield put({ type: PLAYERS_FETCH_SUCCEEDED, players });
  } catch (e) {
    yield put({ type: PLAYERS_FETCH_FAILED, message: e.message });
    /* try again */
    yield call(delay, 3000);
    yield put({ type: PLAYERS_FETCH_REQUESTED });
  }
}

export function* takeEveryPlayersFetchRequest() {
  yield takeEvery(PLAYERS_FETCH_REQUESTED, fetchPlayers);
}

export default [
  takeEveryPlayersFetchRequest,
];
