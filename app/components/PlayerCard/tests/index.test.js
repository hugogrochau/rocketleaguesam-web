import React from 'react';
import { shallow } from 'enzyme';
import { CardHeader, CardText } from 'material-ui/Card';

import PlayerCard from '../index';

const mockPlayer = {
  id: '76561198013819031',
  platform: 0,
  name: 'bd | Freedom',
  '1v1': 1373,
  '2v2': 1409,
  '3v3': 1150,
  '3v3s': 1110,
  sum: 5042,
};

describe('<PlayerCard />', () => {
  const renderedComponent = shallow(
    <PlayerCard player={mockPlayer} />
  );

  const cardHeader = renderedComponent.find(CardHeader).first();

  it('should render the name and sum', () => {
    expect(cardHeader.prop('title')).toEqual(mockPlayer.name);
    expect(cardHeader.prop('subtitle')).toEqual(mockPlayer.sum);
  });

  it('should render all the ranks', () => {
    expect(renderedComponent.find(CardText).children().first().children().length).toEqual(4);
  });
});
