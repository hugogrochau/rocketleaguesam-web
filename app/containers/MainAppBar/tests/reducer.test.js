
import { fromJS } from 'immutable';
import mainAppBarReducer from '../reducer';

describe('mainAppBarReducer', () => {
  it('returns the initial state', () => {
    expect(mainAppBarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
