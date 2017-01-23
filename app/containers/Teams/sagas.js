import { call, put, take, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import fetch from 'isomorphic-fetch';
import { TEAMS_FETCH_REQUESTED, TEAMS_FETCH_FAILED, TEAMS_FETCH_SUCCEEDED } from './constants';
import { teamsFetchSucceeded, teamsFetchFailed } from './actions';

/* eslint-disable no-constant-condition */

const teamUrl = `${API_URL}/v1/team`;

export function* fetchTeamsFromApi() {
  try {
    const res = yield call(fetch, teamUrl);
    /* Delete unneeded columns and calculate rank sum */
    const jsonData = yield call([res, res.json]);

    yield put(teamsFetchSucceeded(jsonData.data));
  } catch (e) {
    yield put(teamsFetchFailed(e.message));
  }
}

export function* takeTeamsFetchRequest() {
  while (true) {
    yield take(TEAMS_FETCH_REQUESTED);
    yield fork(fetchTeamsFromApi);
    /* retry up to five times */
    for (let i = 0; i < 5; i += 1) {
      const result = yield take([TEAMS_FETCH_FAILED, TEAMS_FETCH_SUCCEEDED]);
      if (result.type === TEAMS_FETCH_FAILED) {
        yield call(delay, 3000);
        yield fork(fetchTeamsFromApi);
      } else {
        break;
      }
    }
  }
}

export default [
  takeTeamsFetchRequest,
];
