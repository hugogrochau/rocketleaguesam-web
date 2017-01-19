/* eslint-disable react/no-array-index-key */
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import React, { PropTypes, Component } from 'react'
import IconButton from 'material-ui/IconButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import styles from './style.css'
import { TableSpinner } from '../TableSpinner/index'
import MultiFormatTableRow from '../MultiFormatTableRow'

export default class OrderableTable extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    limit: PropTypes.number, // num of rows in each page,
    orderColumn: PropTypes.string,
    pageNumber: PropTypes.number,
  }

  static defaultProps = {
    isLoading: false,
    limit: 5,
    orderColumn: null,
    pageNumber: 0,
  }

  state = {
    orderColumn: this.props.orderColumn,
    pageNumber: this.props.pageNumber,
    data: this.props.data,
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      orderColumn: newProps.orderColumn,
      pageNumber: newProps.pageNumber,
      data: newProps.data,
    })
  }

  render() {
    const { columns, isLoading, limit } = this.props
    const { pageNumber, orderColumn, data } = this.state
    const total = data.length
    const lowerIndex = Math.ceil(pageNumber * (total / limit))
    const page = data.slice(lowerIndex, lowerIndex + limit)

    return (
      <Table className={styles.table} selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {columns.filter((c) => !c.link && !c.image).map((column) => (
              <TableHeaderColumn
                key={column.name}
                name={column.name}
                onMouseUp={this.orderByColumn.bind(this, column, data)}
              >
                <div className={styles.rowAlign}>
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
              <div className={styles.footerControls}>
                { `${Math.min((pageNumber + 1), total)} - ${Math.min((pageNumber + limit), total)} of ${total}` }
                <IconButton disabled={pageNumber === 0} onClick={() => this.paginate(pageNumber, false)}>
                  <ChevronLeft />
                </IconButton>
                <IconButton disabled={pageNumber + limit >= total} onClick={() => this.paginate(pageNumber, true)}>
                  <ChevronRight />
                </IconButton>
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }

  orderByColumn(column, data) {
    if (column.sortable) {
      const newData = data.slice()
      newData.sort((a, b) => b[column.name] - a[column.name])
      this.setState({
        page: 0,
        data: newData,
        orderColumn: column.name,
      })
    }
  }

  paginate(pageNumber, forward) {
    this.setState({
      pageNumber: pageNumber + (forward ? +1 : -1),
    })
  }
}
