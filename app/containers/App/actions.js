import {
  CHANGE_SIZE_SMALL,
  CHANGE_SIZE_LARGE,
  RESIZE_WINDOW,
  REQUEST_STEAM_OID,
  TOGGLE_DRAWER,
  LOGIN_WITH_TOKEN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGING_IN,
  LOG_OUT,
} from './constants';

export const toggleDrawer = () => ({ type: TOGGLE_DRAWER });

export const resizeWindow = (width, height) => ({ type: RESIZE_WINDOW, width, height });

export const changeSize = (small) => ({ type: small ? CHANGE_SIZE_SMALL : CHANGE_SIZE_LARGE });

export const requestSteamOID = () => ({ type: REQUEST_STEAM_OID });

export const loginWithToken = (token) => ({ type: LOGIN_WITH_TOKEN, token });

export const loginSuccess = (player) => ({ type: LOGIN_SUCCESS, player });

export const loginError = (message) => ({ type: LOGIN_ERROR, message });

export const startLoggingIn = () => ({ type: LOGGING_IN });

export const logout = () => ({ type: LOG_OUT });
