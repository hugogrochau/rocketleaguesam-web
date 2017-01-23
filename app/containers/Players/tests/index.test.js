import React from 'react';
import { shallow } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import { Players, mapDispatchToProps } from '../index';
import { orderPlayers, fetchPlayers } from '../actions';
import OrderedTable from '../../../components/OrderedTable';

injectTapEventPlugin();

describe('<Players />', () => {
  it('Should call fetch players on mount', () => {
    const mockFunc = jest.fn();
    mountWithIntlMui(
      <Players
        fetchPlayers={mockFunc} orderPlayers={() => {}} changePage={() => {}}
      />
    );
    expect(mockFunc).toHaveBeenCalled();
  });

  it('Should render the OrderedTable', () => {
    const renderedComponent = shallow(
      <Players
        fetchPlayers={() => {}} orderPlayers={() => {}} changePage={() => {}}
      />
    );
    expect(renderedComponent.find(OrderedTable).length).toBe(1);
  });

  describe('mapDispatchToProps', () => {
    describe('orderPlayers', () => {
      it('should dispatch orderPlayers when called', () => {
        expect(mapDispatchToProps.orderPlayers()).toEqual(orderPlayers());
      });
    });
  });

  describe('fetchPlayers', () => {
    it('should dispatch orderPlayers when called', () => {
      expect(mapDispatchToProps.fetchPlayers()).toEqual(fetchPlayers());
    });
  });
});
