import React from 'react';

import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';
import { Teams } from '../index';
import TeamCard from '../../../components/TeamCard';

const mockTeams = [
  {
    id: 1,
    name: 'Black Dragons',
    image_url: null,
    created_at: '2017-01-23T01:50:12.887Z',
    last_update: '2017-01-23T01:50:12.887Z',
    players: [
      {
        id: '76561197996947902',
        platform: 0,
        name: 'Krames',
        '1v1': 1166,
        '1v1_division': 1,
        '1v1_games_played': 123,
        '1v1_tier': 15,
        '2v2': 1083,
        '2v2_division': 2,
        '2v2_games_played': 870,
        '2v2_tier': 14,
        '3v3': 1054,
        '3v3_division': 5,
        '3v3_games_played': 678,
        '3v3_tier': 13,
        '3v3s': 966,
        '3v3s_division': 3,
        '3v3s_games_played': 272,
        '3v3s_tier': 13,
        created_at: null,
        last_update: '2017-01-23T01:51:18.350Z',
        team_id: 1,
      },
      {
        id: '76561198119604447',
        platform: 0,
        name: '•¥DuO¥•',
        '1v1': null,
        '1v1_division': null,
        '1v1_games_played': null,
        '1v1_tier': null,
        '2v2': 1349,
        '2v2_division': 1,
        '2v2_games_played': 845,
        '2v2_tier': 15,
        '3v3': 1172,
        '3v3_division': 1,
        '3v3_games_played': 525,
        '3v3_tier': 15,
        '3v3s': 1085,
        '3v3s_division': 1,
        '3v3s_games_played': 299,
        '3v3s_tier': 15,
        created_at: null,
        last_update: '2017-01-23T01:52:02.002Z',
        team_id: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'NoX Gaming',
    image_url: null,
    created_at: '2017-01-23T01:50:34.090Z',
    last_update: '2017-01-23T01:50:34.090Z',
    players: [
      {
        id: '76561198001826378',
        platform: 0,
        name: 'ze',
        '1v1': 1270,
        '1v1_division': 1,
        '1v1_games_played': 559,
        '1v1_tier': 15,
        '2v2': 1339,
        '2v2_division': 1,
        '2v2_games_played': 884,
        '2v2_tier': 15,
        '3v3': 1138,
        '3v3_division': 1,
        '3v3_games_played': 623,
        '3v3_tier': 15,
        '3v3s': 1102,
        '3v3s_division': 1,
        '3v3s_games_played': 143,
        '3v3s_tier': 15,
        created_at: null,
        last_update: '2017-01-23T02:02:03.590Z',
        team_id: 2,
      },
      {
        id: 'caiotg1',
        platform: 1,
        name: 'CaioTG1',
        '1v1': 1506,
        '1v1_division': 5,
        '1v1_games_played': 224,
        '1v1_tier': 15,
        '2v2': 1424,
        '2v2_division': 1,
        '2v2_games_played': 1046,
        '2v2_tier': 15,
        '3v3': 1198,
        '3v3_division': 1,
        '3v3_games_played': 344,
        '3v3_tier': 15,
        '3v3s': 1086,
        '3v3s_division': 1,
        '3v3s_games_played': 124,
        '3v3s_tier': 15,
        created_at: null,
        last_update: '2017-01-23T01:59:22.148Z',
        team_id: 2,
      },
    ],
  },
];

describe('<Teams />', () => {
  const mockFunc = jest.fn();

  const renderedComponent = mountWithIntlMui(
    <Teams fetchTeams={mockFunc} teams={mockTeams} />
  );

  it('should render the teams', () => {
    expect(renderedComponent.find(TeamCard).length).toEqual(2);
  });

  it('should call fetchTeams on mount', () => {
    expect(mockFunc).toHaveBeenCalled();
  });
});
