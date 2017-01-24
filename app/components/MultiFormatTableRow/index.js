import { TableRow, TableRowColumn } from 'material-ui/Table';
import React from 'react';
import { Link } from 'react-router';

export default class MultiFormatTableRow extends React.PureComponent {

  render() {
    const { index, row, columns } = this.props;

    return (
      <TableRow striped={index % 2 !== 0}>
        {index && (
          <TableRowColumn key="#" style={{ width: '60px' }}>{index}</TableRowColumn>
        )}
        {columns.filter((c) => !c.link && !c.image).map((column) => (
          <TableRowColumn key={column.name}>{ formatTableCell(row, column) }</TableRowColumn>
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
  index: 0,
};
