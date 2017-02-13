import { createSelector } from 'reselect';

/**
 * Direct selector to the mainAppBar state domain
 */
const selectApp = (state) => state.get('app');

/**
 * Other specific selectors
 */

const makeSelectDrawerOpen = () => createSelector(
  selectApp,
  (App) => App.get('drawerOpen')
);

const makeSelectIsSmall = () => createSelector(
  selectApp,
  (playerState) => playerState.get('small')
);

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Default selector used by MainAppBar
 */
const makeSelectAppState = () => createSelector(
  selectApp,
  (App) => App.toJS()
);

export default makeSelectAppState();

export {
  selectApp,
  makeSelectDrawerOpen,
  makeSelectIsSmall,
  makeSelectLocationState,
};

