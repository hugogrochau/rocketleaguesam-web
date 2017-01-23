/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { take, put, fork } from 'redux-saga/effects';
import { fetchPlayersFromApi, takePlayersFetchRequest } from '../sagas';
import { playersFetchSucceeded, playersFetchFailed } from '../actions';
import { PLAYERS_FETCH_REQUESTED, PLAYERS_FETCH_FAILED, PLAYERS_FETCH_SUCCEEDED } from '../constants';

const players = [{
  id: 'caiotg1',
  platform: 1,
  name: 'CaioTG1',
  '1v1': 1506,
  '2v2': 1424,
  '3v3': 1198,
  '3v3s': 1086,
},
{
  id: '76561198013819031',
  platform: 0,
  name: 'bd | Freedom',
  '1v1': 1373,
  '2v2': 1409,
  '3v3': 1150,
  '3v3s': 1110,
}];


describe('fetchPlayersFromApi', () => {
  let generator;

  const mockRes = {
    json: () => {},
  };

  beforeEach(() => {
    generator = fetchPlayersFromApi();

    // skip fetch
    generator.next(); // call fetch descriptor
  });

  it('should dispatch a playersFetchSucceeded action on success', () => {
    const expectedResult = players.slice();
    expectedResult[0].sum = 5214;
    expectedResult[1].sum = 5042;

    generator.next(mockRes); // call res.json descriptor
    const putDescriptor = generator.next({ data: players }).value;
    expect(putDescriptor).toEqual(put(playersFetchSucceeded(expectedResult)));
  });

  it('should dispatch a playersFetchFailed action on failure', () => {
    const putDescriptor = generator.throw(new Error('rats ate the cables')).value; // callJsonDescriptor

    expect(putDescriptor).toEqual(put(playersFetchFailed('rats ate the cables')));
  });
});

describe('takePlayersFetchRequest', () => {
  const generator = takePlayersFetchRequest();

  generator.next(); // take descriptor

  it('should fork fetchPlayersFromApi on PLAYERS_FETCH_REQUESTED', () => {
    const forkDescriptor = generator.next(PLAYERS_FETCH_REQUESTED).value;
    expect(forkDescriptor).toEqual(fork(fetchPlayersFromApi));
  });

  it('should try again on PLAYERS_FETCH_FAILED', () => {
    generator.next(); // take Descriptor
    generator.next(PLAYERS_FETCH_FAILED); // call descriptor
    const forkDescriptor = generator.next().value;
    expect(forkDescriptor).toEqual(fork(fetchPlayersFromApi));
  });

  it('should stop again on PLAYERS_FETCH_SUCCEEDED', () => {
    generator.next(); // take Descriptor
    const takeDescriptor = generator.next(PLAYERS_FETCH_SUCCEEDED).value; // take PLAYERS_FETCH_REQUESTED
    expect(takeDescriptor).toEqual(take(PLAYERS_FETCH_REQUESTED));
  });
});
