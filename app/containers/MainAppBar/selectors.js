import { createSelector } from 'reselect';

/**
 * Direct selector to the mainAppBar state domain
 */
const selectMainAppBar = (state) => state.get('mainAppBar');

/**
 * Other specific selectors
 */

const makeSelectDrawerOpen = () => createSelector(
  selectMainAppBar,
  (mainAppBar) => mainAppBar.get('drawerOpen')
);


/**
 * Default selector used by MainAppBar
 */

const makeSelectMainAppBarState = () => createSelector(
  selectMainAppBar(),
  (mainAppBar) => mainAppBar.toJS()
);

export default makeSelectMainAppBarState;
export {
  selectMainAppBar,
  makeSelectDrawerOpen,
};
