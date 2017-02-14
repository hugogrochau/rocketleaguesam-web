import { RESIZE_WINDOW } from './constants';
import { changeSize } from './actions';

const resizeWindowEpic = (action$, { getState }) =>
  action$.ofType(RESIZE_WINDOW)
    .map((action) => ({ small: action.width < 960, previousSmall: getState().get('app').get('small') }))
    .filter(({ small, previousSmall }) => small !== previousSmall)
    .map(({ small }) => changeSize(small));

export default [
  resizeWindowEpic,
];
