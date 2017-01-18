import { call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import { sumPlayerRanks } from './utils';

import {
  PLAYERS_FETCH_REQUESTED,
  PLAYERS_FETCH_SUCCEEDED,
  PLAYERS_FETCH_FAILED,
  PLAYER_COLUMNS
} from './constants';

import request from 'superagent';

//TODO: Make a client for my API
const playerUrl = 'http://127.0.0.1:8080/api/v1/player';

function* fetchPlayers() {
  try {
    const res = yield call(() => request(playerUrl));
    /* Delete unneeded columns and calculate rank sum */
    let players = res.body.data.map( x => {
      return Object.assign(
        _.pick(x, PLAYER_COLUMNS),
        { sum: sumPlayerRanks(x) }
      )
    });

    yield put({type: PLAYERS_FETCH_SUCCEEDED, players: players});
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