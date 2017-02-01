import { TableRow, TableRowColumn } from 'material-ui/Table';
import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const SmallTableRowColumn = styled(TableRowColumn)`
  padding-left: 12px !important
  padding-right: 12px !important
  width: 80px !important
`;

const MultiFormatTableRow = ({ index, row, columns }) =>
  <TableRow striped={index % 2 !== 0}>
    {columns.map((column) => {
      if (!column.link && !column.image) {
        if (column.small) {
          return (<SmallTableRowColumn key={column.name}>{ formatTableCell(row, column) }</SmallTableRowColumn>);
        }
        return (<TableRowColumn key={column.name}>{ formatTableCell(row, column) }</TableRowColumn>);
      }
      return '';
    })}
  </TableRow>
;


MultiFormatTableRow.propTypes = {
  index: React.PropTypes.number.isRequired,
  row: React.PropTypes.object.isRequired,
  columns: React.PropTypes.array.isRequired,
};

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

export default MultiFormatTableRow;
