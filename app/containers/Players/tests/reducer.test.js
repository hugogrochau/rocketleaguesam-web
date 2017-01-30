import { fromJS } from 'immutable';
import playersReducer from '../reducer';
import { playersFetchSucceeded, playersFetchFailed, playerSearch, orderPlayers, changePage } from '../actions';

const players = fromJS({
  players: [{
    id: 'caiotg1',
    platform: 1,
    name: 'CaioTG1',
    '1v1': 1506,
    '1v1_tier': 15,
    '2v2': 1424,
    '3v3': 1198,
    '3v3s': 1086,
    sum: 5214,
  },
  {
    id: '76561198013819031',
    platform: 0,
    name: 'bd | Freedom',
    '1v1': 1373,
    '2v2': 1409,
    '3v3': 1150,
    '3v3s': 1110,
    sum: 5042,
  }],
});

describe('playersReducer', () => {
  let state;

  beforeEach(() => {
    // initial state
    state = fromJS({
      orderColumn: 'sum',
      page: 0,
      players: [],
    });
  });

  it('returns the initial state', () => {
    expect(playersReducer(undefined, {})).toEqual(state);
  });

  it('should handle the playersFetchSucceeded action correctly', () => {
    const expectedResult = state.set('players', players);
    expect(playersReducer(state, playersFetchSucceeded(players))).toEqual(expectedResult);
  });

  it('should handle the playersFetchFailed action correctly', () => {
    const expectedResult = state.set('failedPlayerFetch', true);
    expect(playersReducer(state, playersFetchFailed(players))).toEqual(expectedResult);
  });

  it('should handle the orderPlayers action correctly', () => {
    const expectedResult = state.set('orderColumn', '1v1');
    expect(playersReducer(state, orderPlayers('1v1'))).toEqual(expectedResult);
  });

  it('should handle the orderPlayers action correctly', () => {
    const expectedResult = state.set('playerSearch', 'foobar');
    expect(playersReducer(state, playerSearch('foobar'))).toEqual(expectedResult);
  });

  it('should handle the changePage action correctly forwards', () => {
    const expectedResult = state.set('page', 1);
    expect(playersReducer(state, changePage(true))).toEqual(expectedResult);
  });

  it('should handle the changePage action correctly backwards', () => {
    const expectedResult = state.set('page', -1);
    expect(playersReducer(state, changePage(false))).toEqual(expectedResult);
  });
});
