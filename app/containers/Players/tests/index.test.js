import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import { Players } from '../index';

injectTapEventPlugin();

describe('<Players />', () => {
  it('Should call fetch players on mount', () => {
    const mockFunc = jest.fn();
    mountWithIntlMui(
      <Players
        fetchPlayers={mockFunc}
      />
    );
    expect(mockFunc).toHaveBeenCalled();
  });

  it('Should render the OrderedTable', () => {
    const renderedComponent = shallow(
      <Players />
    );
    expect(renderedComponent.find('OrderedTable').length).toBe(1);
  });
});
