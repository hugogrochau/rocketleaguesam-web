
import appReducer from '../reducer';

describe('appReducer', () => {
  it('returns the initial state', () => {
    expect(appReducer(undefined, {}).toJS()).toEqual({
      drawerOpen: false,
      small: false,
      isLoggingIn: false,
      logged: false,
      player: {},
    });
  });
});
