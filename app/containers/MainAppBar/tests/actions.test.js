
import {
  defaultAction,
} from '../actions';
import {
  TOGGLE_DRAWER,
} from '../constants';

describe('MainAppBar actions', () => {
  describe('Default Action', () => {
    it('has a type of TOGGLE_DRAWER', () => {
      const expected = {
        type: TOGGLE_DRAWER,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
