import {
  TOGGLE_DRAWER,
  RESIZE_WINDOW,
  CHANGE_SIZE_SMALL,
  CHANGE_SIZE_LARGE,
} from './constants';

export const toggleDrawer = () => ({ type: TOGGLE_DRAWER });

export const resizeWindow = (width, height) => ({ type: RESIZE_WINDOW, width, height });

export const changeSize = (small) => ({ type: small ? CHANGE_SIZE_SMALL : CHANGE_SIZE_LARGE });
