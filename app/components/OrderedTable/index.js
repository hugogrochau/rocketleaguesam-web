/**
 *
 * OrderableTable
 *
 */

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import TableSpinner from '../TableSpinner';
import MultiFormatTableRow from '../MultiFormatTableRow';

class OrderedTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { columns, data, isLoading, limit, orderColumn, page, indexColumn,
      onColumnClicked, onPageChangeRequested } = this.props;
    const total = data.length;
    const lowerIndex = page * limit;
    const pageData = data.slice(lowerIndex, lowerIndex + limit);

    /* TODO: make a prop for displaying # of the column */
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {indexColumn && (
              <TableHeaderColumn key="#" style={{ width: '60px' }}>
                <div>#</div>
              </TableHeaderColumn>
            )}
            {columns.filter((c) => !c.link && !c.image).map((column) => (
              <TableHeaderColumn
                key={column.name}
                onMouseUp={() => column.sortable && onColumnClicked(column.name)}
              >
                <div>
                  {column.name}
                  {column.name === orderColumn && '▼'}
                </div>
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows displayRowCheckbox={false}>
          {(isLoading && <TableSpinner />) ||
            (pageData.map((row, index) => (
              <MultiFormatTableRow key={index} index={lowerIndex + index + 1} {...{ row, columns, indexColumn }} />
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
  }
}

OrderedTable.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,

  isLoading: React.PropTypes.bool,
  limit: React.PropTypes.number, // num of rows in each page,
  orderColumn: React.PropTypes.string, // column to order by
  page: React.PropTypes.number,
  indexColumn: React.PropTypes.bool, // display index column
  onColumnClicked: React.PropTypes.func,
  onPageChangeRequested: React.PropTypes.func,
};

OrderedTable.defaultProps = {
  isLoading: false,
  limit: 10,
  orderColumn: null,
  page: 0,
  indexColumn: true,
  onColumnClicked: () => {},
  onPageChangeRequested: () => {},
};

export default OrderedTable;
