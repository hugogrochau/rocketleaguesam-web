import {
  toggleDrawer,
  changeSize,
} from '../actions';
import {
  TOGGLE_DRAWER,
  CHANGE_SIZE_SMALL,
  CHANGE_SIZE_LARGE,
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
  describe('ChangeSize Action', () => {
    it('has a type of CHANGE_SIZE_SMALL on small change', () => {
      const expected = {
        type: CHANGE_SIZE_SMALL,
      };
      expect(changeSize(true)).toEqual(expected);
    });
    it('has a type of CHANGE_SIZE_LARGE on large change', () => {
      const expected = {
        type: CHANGE_SIZE_LARGE,
      };
      expect(changeSize(false)).toEqual(expected);
    });
  });
});
