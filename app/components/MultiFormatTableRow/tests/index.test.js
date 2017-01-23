import React from 'react';
import { shallow, mount } from 'enzyme';
import { TableRowColumn, TableRow } from 'material-ui';
import { Link } from 'react-router';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MultiFormatTableRow from '../index';

injectTapEventPlugin();

const mockColumns = [
  { name: 'foo' },
  { name: 'bar' },
  { name: 'link', type: 'link', linkColumn: 'linkAddress' },
  { name: 'linkAddress', link: true },
];

const mockRow = {
  foo: '1',
  bar: '2',
  linkAddress: 'purple.com',
  link: 'foo',
};

describe('<MultiFormatTableRow />', () => {
  const renderedComponent = shallow(
    <MultiFormatTableRow row={mockRow} columns={mockColumns} />
  );

  it('Should render 3 rows', () => {
    expect(renderedComponent.find(TableRowColumn).length).toBe(3);
  });

  it('Should render a link', () => {
    expect(renderedComponent.find(Link).first().prop('to')).toBe('purple.com');
  });

  it('Should render an index row', () => {
    const indexRenderedComponent = mount(
      <MuiThemeProvider>
        <IntlProvider locale="en">
          <MultiFormatTableRow row={mockRow} columns={mockColumns} index={1} />
        </IntlProvider>
      </MuiThemeProvider>
    );

    expect(indexRenderedComponent
      .find(TableRow).first()
      .find(TableRowColumn).first()
      .text()
    ).toEqual('1');
  });
});
