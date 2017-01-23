import React from 'react';
import { shallow } from 'enzyme';
import { CardHeader } from 'material-ui/Card';
import PlayerCard from '../../PlayerCard';

import TeamCard from '../index';

const mockTeam =
  {
    id: 1,
    name: 'Black Dragons',
    image_url: null,
    created_at: '2017-01-23T01:50:12.887Z',
    last_update: '2017-01-23T01:50:12.887Z',
    average: 4111,
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
  };

describe('<TeamCard />', () => {
  const renderedComponent = shallow(
    <TeamCard team={mockTeam} />
  );

  const cardHeader = renderedComponent.find(CardHeader).first();

  it('should render the name and average', () => {
    expect(cardHeader.prop('title')).toEqual(mockTeam.name);
    expect(cardHeader.prop('average')).toEqual(mockTeam.sum);
  });

  it('should render the players', () => {
    expect(renderedComponent.find(PlayerCard).length).toEqual(2);
  });
});
