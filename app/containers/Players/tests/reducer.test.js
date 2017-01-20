
import { fromJS } from 'immutable';
import playersReducer from '../reducer';

describe('playersReducer', () => {
  it('returns the initial state', () => {
    expect(playersReducer(undefined, {})).toEqual(fromJS({
      orderColumn: 'sum',
      page: 0,
    }));
  });
});
