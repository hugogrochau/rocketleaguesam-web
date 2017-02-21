import React from 'react';
import { Link } from 'react-router';
import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import LoggedMenu from '../index';

const mockLinks = [
  {
    name: 'PLAYERNAME',
    link: '/player/1/foo',
  },
  {
    name: 'TEAMNAME',
    link: '/team/0',
  },
];

describe('<LoggedMenu />', () => {
  const renderedComponent = mountWithIntlMui(
    <LoggedMenu links={mockLinks} logged />
  );

  it('Should render the links', () =>
    expect(renderedComponent.find(Link).length).toBe(2)
  );
  it('Should render the first', () =>
    expect(renderedComponent.find(Link).first().props().to).toBe('/player/1/foo')
  );
  it('Should render the second', () =>
    expect(renderedComponent.find(Link).at(1).props().to).toBe('/team/0')
  );
});
