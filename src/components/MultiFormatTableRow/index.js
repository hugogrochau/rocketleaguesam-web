/* eslint-disable react/no-array-index-key */
import { TableRow, TableRowColumn } from 'material-ui/Table'
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class MultiFormatTableRow extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
  }

  render() {
    const { index, row, columns } = this.props

    return (
      <TableRow key={index}>
        {columns.filter((c) => !c.link && !c.image).map((column, propIndex) => (
          <TableRowColumn key={propIndex}>{ this.formatTableCell(row, column) }</TableRowColumn>
        ))}
      </TableRow>
    )
  }

  formatTableCell(row, column) {
    const value = row[column.name]
    switch (column.type) {
      case 'link':
        return <Link style={{ color: 'black' }} to={row[column.linkColumn]}>{value}</Link>
      case 'date':
        return new Date()
      case 'image':
        return (
          <img
            alt={value}
            src={row[column.imageColumn]}
            width="15px" height="15px"
          />)
      default:
        return value
    }
  }
}
