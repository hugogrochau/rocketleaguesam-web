import { fromJS } from 'immutable';
import makeSelectPlayersState, { makeSelectPlayers, makeSelectPlayerSearch, makeSelectOrderColumn, makeSelectPage } from '../selectors';

const mockPlayersState = fromJS({
  players: {
    orderColumn: '3v3s',
    page: 0,
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
  },
});

describe('makeSelectPlayers', () => {
  const playersSelector = makeSelectPlayers();

  it('should select players in order', () => {
    expect(playersSelector(mockPlayersState)[0].id).toEqual('76561198013819031');
  });
});

describe('makeSelectPlayerSearch', () => {
  const playerSearchSelector = makeSelectPlayerSearch();
  const playersSelector = makeSelectPlayers();
  const mockPlayerStateSearched = mockPlayersState.setIn(['players', 'playerSearch'], 'caio');

  it('should select playerSearch', () => {
    expect(playerSearchSelector(mockPlayerStateSearched)).toEqual('caio');
  });

  it('should filter according to playerSearch', () => {
    expect(playersSelector(mockPlayerStateSearched).length).toEqual(1);
  });
});

describe('makeSelectOrderColumn', () => {
  const orderColumnSelector = makeSelectOrderColumn();

  it('should select the order column', () => {
    expect(orderColumnSelector(mockPlayersState)).toEqual('3v3s');
  });
});

describe('makeSelectPage', () => {
  const pageSelector = makeSelectPage();

  it('should select the page', () => {
    expect(pageSelector(mockPlayersState)).toEqual(0);
  });
});

describe('makeSelectPlayersState', () => {
  const playersStateSelector = makeSelectPlayersState();

  it('should select the player state', () => {
    expect(playersStateSelector(mockPlayersState)).toBeDefined();
  });
});
