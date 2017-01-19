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

  constructor(props) {
    super(props);
    this.state = {
      orderColumn: this.props.orderColumn,
      pageNumber: this.props.pageNumber,
      data: this.props.data,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      orderColumn: newProps.orderColumn,
      pageNumber: newProps.pageNumber,
      data: newProps.data,
    });
  }
  /* TODO: Dispatch these as actions */
  orderByColumn(column, data) {
    if (column.sortable) {
      const newData = data.slice();
      newData.sort((a, b) => b[column.name] - a[column.name]);
      this.setState({
        pageNumber: 0,
        data: newData,
        orderColumn: column.name,
      });
    }
  }

  paginate(pageNumber, forward) {
    this.setState({
      pageNumber: pageNumber + (forward ? +1 : -1),
    });
  }

  render() {
    const { columns, isLoading, limit } = this.props;
    const { pageNumber, orderColumn, data } = this.state;
    const total = data.length;
    const lowerIndex = pageNumber * limit;
    const page = data.slice(lowerIndex, lowerIndex + limit);

    /* TODO: make a prop for displaying # of the column */
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {columns.filter((c) => !c.link && !c.image).map((column) => (
              <TableHeaderColumn
                key={column.name}
                name={column.name}
                onMouseUp={this.orderByColumn.bind(this, column, data)}
              >
                <div>
                  {column.name}
                  {column.name === orderColumn && '▼'}
                </div>
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows displayRowCheckbox={false} preScanRows>
          {
            (isLoading && <TableSpinner />) ||
            (page.map((row, index) => (
              <MultiFormatTableRow key={index} {...{ index, row, columns }} />
            )))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div>
                { `${Math.min(lowerIndex, total) + 1} - ${Math.min((lowerIndex + limit), total)} of ${total}` }
                <IconButton disabled={pageNumber === 0} onClick={() => this.paginate(pageNumber, false)}>
                  <ChevronLeft />
                </IconButton>
                <IconButton disabled={lowerIndex + limit >= total} onClick={() => this.paginate(pageNumber, true)}>
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
  orderColumn: React.PropTypes.string,
  pageNumber: React.PropTypes.number,
};

OrderedTable.defaultProps = {
  isLoading: false,
  limit: 5,
  orderColumn: null,
  pageNumber: 0,
};

export default OrderedTable;
