import React from 'react';
import { Link } from 'react-router';
import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import MainAppBar from '../index';

const mockLinks = [
  {
    name: 'players',
    link: '/players',
  },
  {
    name: 'teams',
    link: '/teams',
  },
];

describe('<MainAppBar />', () => {
  const mockToggleDrawer = jest.fn();
  const renderedComponent = mountWithIntlMui(
    <MainAppBar drawerOpen={false} logged={false} menuLinks={mockLinks} title={'Test'} toggleDrawer={mockToggleDrawer} />
  );

  it('Should render the links', () =>
    expect(renderedComponent.find(Link).length).toBe(2)
  );
  it('Should render the first', () =>
    expect(renderedComponent.find(Link).first().props().to).toBe('/players')
  );
  it('Should render the second', () =>
    expect(renderedComponent.find(Link).at(1).props().to).toBe('/teams')
  );
});
