import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/catch';

import {
  RESIZE_WINDOW,
  REQUEST_STEAM_OID,
  LOGIN_WITH_TOKEN,
} from './constants';
import { changeSize, loginSuccess, loginError, startLoggingIn } from './actions';

const resizeWindowEpic = (action$, { getState }) =>
  action$.ofType(RESIZE_WINDOW)
    .throttleTime(300)
    .map((action) => ({
      isSmall: action.width < 960,
      wasSmall: getState().get('app').get('small') }))
    .filter(({ isSmall, wasSmall }) => isSmall !== wasSmall)
    .map(({ isSmall }) => changeSize(isSmall));

const requestSteamOIDEpic = (action$, { getState }, api) =>
  action$.ofType(REQUEST_STEAM_OID)
    .throttleTime(300)
    .mergeMap(() => api.auth.authenticate({ body: {
      return_url: `${location.origin}/auth`,
      realm: location.origin,
    } }))
    .do((response) => { window.location = response.data; })
    // prevent console error
    .map(() => ({ type: 'NOTHING' }))
    .catch((err) => Observable.of(loginError(err.data)));

const loginWithTokenEpic = (action$, { getState, dispatch }, api) =>
  action$.ofType(LOGIN_WITH_TOKEN)
    .do(() => dispatch(startLoggingIn()))
    .mergeMap(({ token }) => api.player.me({ headers: { auth_token: token } }))
    .map((res) => loginSuccess(res.data.player))
    .catch((err) => Observable.of(loginError(err.data)));

export default [
  resizeWindowEpic,
  requestSteamOIDEpic,
  loginWithTokenEpic,
];
