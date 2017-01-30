import React from 'react';
import { shallow } from 'enzyme';
import { TableRowColumn, TableRow } from 'material-ui';
import { Link } from 'react-router';
import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import MultiFormatTableRow from '../index';

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
    <MultiFormatTableRow index={1} row={mockRow} columns={mockColumns} />
  );

  it('Should render 3 rows', () => {
    expect(renderedComponent.find(TableRowColumn).length).toBe(3);
  });

  it('Should render a link', () => {
    expect(renderedComponent.find(Link).first().prop('to')).toBe('purple.com');
  });

  it('Should render an index row', () => {
    const indexRenderedComponent = mountWithIntlMui(
      <MultiFormatTableRow index={1} row={mockRow} columns={mockColumns} rankIndex={1} />
    );

    expect(indexRenderedComponent
      .find(TableRow).first()
      .find(TableRowColumn).first()
      .text()
    ).toEqual('1');
  });
});
