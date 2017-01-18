import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table'
import * as Actions from './actions'
import { DECRESCENT } from './constants'

// TODO refactor into a container and a component
class Players extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.array,
    sortPlaylist: PropTypes.string,
    sortOrder: PropTypes.bool,
  }

  static defaultProps = {
    players: [],
    sortPlaylist: 'sum',
    sortOrder: DECRESCENT,
    failed: false,
  }

  componentDidMount = () => {
    this.props.actions.fetchPlayers()
  }

  render() {
    return (
      <div>
        <Table
          wrapperStyle={{ overflowX: 'hidden' }}
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Steam or PS4">Platform</TableHeaderColumn>

              <TableHeaderColumn onMouseUp={() => this.props.actions.changeSort('1v1')} >
                1v1 {this.sortArrow('1v1')}
              </TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.props.actions.changeSort('2v2')} >
                2v2 {this.sortArrow('2v2')}
              </TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.props.actions.changeSort('3v3s')} >
                3v3 Solo {this.sortArrow('3v3s')}
              </TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.props.actions.changeSort('3v3')} >
                3v3 {this.sortArrow('3v3')}
              </TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.props.actions.changeSort('sum')} >
                Sum {this.sortArrow('sum')}
              </TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows
          >
            {this.props.players.map((player, i) => (
              <TableRow key={player.id}>

                <TableRowColumn>{player.id === '76561198278242542' ? 251 : i + 1}</TableRowColumn>
                {/* iterate through columns */}
                {Object.entries(player).map((entry) => {
                  const [column, value] = entry
                  if (column === 'id') {
                    return ''
                  } else if (column === 'name') {
                    /* link to steam profile */
                    if (player.platform === 0) {
                      return (
                        <TableRowColumn key={column}>
                          <a href={`http://steamcommunity.com/profiles/${player.id}`}>
                            {value}
                          </a>
                        </TableRowColumn>
                      )
                    }
                    return <TableRowColumn key={column}>{value}</TableRowColumn>
                    /* include platform logo */
                  } else if (column === 'platform') {
                    return (
                      <TableRowColumn key={column}>
                        <img
                          alt="Platform logo" src={`http://hugo.grochau.com/sam-ranking/images/${value}.svg`}
                          width="15px" height="15px"
                        />
                      </TableRowColumn>
                    )
                  }
                  return <TableRowColumn key={column}>{value}</TableRowColumn>
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  sortArrow = (playlist) => {
    if (this.props.sortPlaylist === playlist) {
      return this.props.sortOrder ? '▼' : '▲'
    }
    return ''
  }
}

const mapStateToProps = (state) => (
  {
    players: state.players.players,
    sortPlaylist: state.players.sortPlaylist,
    sortOrder: state.players.sortOrder,
  })

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(Actions, dispatch),
  })

export default connect(mapStateToProps, mapDispatchToProps)(Players)
