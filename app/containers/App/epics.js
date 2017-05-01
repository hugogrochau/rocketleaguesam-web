import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/throttleTime';

import { RESIZE_WINDOW } from './constants';
import { changeSize } from './actions';

const resizeWindowEpic = (action$, { getState }) =>
  action$.ofType(RESIZE_WINDOW)
    .throttleTime(300)
    .map((action) => ({
      isSmall: action.width < 960,
      wasSmall: getState().get('app').get('small') }))
    .filter(({ isSmall, wasSmall }) => isSmall !== wasSmall)
    .map(({ isSmall }) => changeSize(isSmall));

export default [
  resizeWindowEpic,
];
