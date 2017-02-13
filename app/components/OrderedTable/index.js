import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styled from 'styled-components';
import MultiFormatTableRow from '../MultiFormatTableRow';

const SmallTableHeaderColumn = styled(TableHeaderColumn)`
  padding-left: 12px !important
  padding-right: 12px !important
  width: 80px !important
`;

/* TODO: move pagination element to its own component */
const OrderedTable = ({ columns, data, limit, orderColumn, page, onColumnClicked, onPageChangeRequested }) => {
  const total = data.length;
  const lowerIndex = page * limit;
  const pageData = data.slice(lowerIndex, lowerIndex + limit);

  return (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {columns.map((column) => {
            if (!column.link && !column.image) {
              if (column.small) {
                return (
                  <SmallTableHeaderColumn
                    key={column.name}
                    onMouseUp={() => column.sortable && onColumnClicked(column.name)}
                  >
                    {column.name}
                    {column.name === orderColumn && '▼'}
                  </SmallTableHeaderColumn>);
              }
              return (
                <TableHeaderColumn
                  key={column.name}
                  onMouseUp={() => column.sortable && onColumnClicked(column.name)}
                >
                  {column.name}
                  {column.name === orderColumn && '▼'}
                </TableHeaderColumn>);
            }
            return '';
          })}
        </TableRow>
      </TableHeader>
      <TableBody showRowHover displayRowCheckbox={false}>
        {(pageData.map((row, index) => (
          <MultiFormatTableRow key={index} index={index} {...{ row, columns }} /> // eslint-disable-line react/no-array-index-key
        )))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableRowColumn>
            <div>
              { `${Math.min(lowerIndex, total) + 1} - ${Math.min((lowerIndex + limit), total)} of ${total}` }
              <IconButton disabled={page === 0} onClick={() => onPageChangeRequested(false)}>
                <ChevronLeft />
              </IconButton>
              <IconButton disabled={lowerIndex + limit >= total} onClick={() => onPageChangeRequested(true)}>
                <ChevronRight />
              </IconButton>
            </div>
          </TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

OrderedTable.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,

  limit: React.PropTypes.number, // num of rows in each page,
  orderColumn: React.PropTypes.string, // column to order by
  page: React.PropTypes.number,
  onColumnClicked: React.PropTypes.func,
  onPageChangeRequested: React.PropTypes.func,
};

OrderedTable.defaultProps = {
  limit: 10,
  orderColumn: null,
  page: 0,
  onColumnClicked: () => {},
  onPageChangeRequested: () => {},
};

export default OrderedTable;
