import { call, put, takeEvery } from 'redux-saga/effects';
import {
  PLAYERS_FETCH_REQUESTED,
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED
} from './constants';
import request from 'superagent';

const playerUrl = 'http://127.0.0.1:8080/api/v1/player';

function* fetchPlayers() {
  try {
    const res = yield call(() => request(playerUrl));
    yield put({type: PLAYERS_FETCH_SUCCEEDED, players: res.body.data});
  } catch (e) {
    yield put({type: PLAYERS_FETCH_FAILED, message: e.message});
    /* try again */
    put({type: PLAYERS_FETCH_REQUESTED});
  }
}

function* takeEveryPlayersFetchRequest() {
  yield takeEvery(PLAYERS_FETCH_REQUESTED, fetchPlayers)
}

export default takeEveryPlayersFetchRequest;