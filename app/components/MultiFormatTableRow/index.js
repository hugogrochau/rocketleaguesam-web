/**
 *
 * MultiFormatTableRow
 *
 */

import { TableRow, TableRowColumn } from 'material-ui/Table';
import React from 'react';
import { Link } from 'react-router';

export default class MultiFormatTableRow extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { index, row, columns } = this.props;

    return (
      <TableRow>
        {index && (
          <TableRowColumn key="#" style={{ width: '60px' }}>{index}</TableRowColumn>
        )}
        {columns.filter((c) => !c.link && !c.image).map((column, propIndex) => (
          <TableRowColumn key={propIndex}>{ formatTableCell(row, column) }</TableRowColumn>
        ))}
      </TableRow>
    );
  }
}

const formatTableCell = (row, column) => {
  const value = row[column.name];
  switch (column.type) {
    case 'link':
      return <Link style={{ color: 'black' }} to={row[column.linkColumn]}>{value}</Link>;
    case 'date':
      return new Date();
    case 'image':
      return (
        <img
          alt={value}
          src={row[column.imageColumn]}
          width="15px" height="15px"
        />);
    default:
      return value;
  }
};

MultiFormatTableRow.propTypes = {
  index: React.PropTypes.number,
  row: React.PropTypes.object.isRequired,
  columns: React.PropTypes.array.isRequired,
};

MultiFormatTableRow.defaultProps = {
  index: false,
};
