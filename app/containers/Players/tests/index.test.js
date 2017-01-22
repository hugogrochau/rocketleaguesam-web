import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Players, mapDispatchToProps } from '../index';
import { orderPlayers, fetchPlayers } from '../actions';
import OrderedTable from '../../../components/OrderedTable';

injectTapEventPlugin();

describe('<Players />', () => {
  it('Should call fetch players on mount', () => {
    const mockFunc = jest.fn();
    mount(
      <MuiThemeProvider>
        <IntlProvider locale="en">
          <Players
            fetchPlayers={mockFunc} orderPlayers={() => {}} changePage={() => {}}
          />
        </IntlProvider>
      </MuiThemeProvider>);
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
