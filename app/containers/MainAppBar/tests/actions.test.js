
import {
  toggleDrawer,
} from '../actions';
import {
  TOGGLE_DRAWER,
} from '../constants';

describe('MainAppBar actions', () => {
  describe('ToggleDrawer Action', () => {
    it('has a type of TOGGLE_DRAWER', () => {
      const expected = {
        type: TOGGLE_DRAWER,
      };
      expect(toggleDrawer()).toEqual(expected);
    });
  });
});
