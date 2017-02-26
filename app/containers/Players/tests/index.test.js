import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import { Players } from '../index';
import OrderedTable from '../components/OrderedTable';

injectTapEventPlugin();

describe('<Players />', () => {
  const mockFunc = jest.fn();
  const renderedComponent = mountWithIntlMui(
    <Players
      fetchPlayers={mockFunc}
    />
  );
  it('Should call fetch players on mount', () =>
    expect(mockFunc).toHaveBeenCalled()
  );
  it('Should render OrderedTable', () =>
    expect(renderedComponent.find(OrderedTable).length).toBe(1)
  );
});
