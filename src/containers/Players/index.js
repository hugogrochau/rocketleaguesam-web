import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// TODO refactor into a container and a component
class Players extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.actions.fetchPlayers();
  };

  sortArrow = playlist => {
    if (this.props.sortPlaylist == playlist) {
      return this.props.sortOrder ? '▼' : '▲';
    }
    return '';
  };

  render() {
    return (
      <div>
        <Table
          wrapperStyle={{'overflow-x': 'hidden'}}
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
              <TableHeaderColumn onMouseUp={() => this.props.actions.changeSort('sum')}
                                 tooltip="All the ranks added together">
                Sum {this.sortArrow('sum')}
              </TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={true}
          >
            {this.props.players.map((player, index) => (
              <TableRow key={index}>

                <TableRowColumn>{player.id == '76561198278242542' ? 251 : index + 1}</TableRowColumn>

                /* iterate through columns */
                {Object.entries(player).map(( entry, index) => {
                  const [column, value] = entry;
                  if (column === 'id') {
                    return;
                  }
                  if (column === 'name' ) {
                    /* link to steam profile */
                    if (player.platform === 0) {
                      return (
                        <TableRowColumn key={index}>
                          <a href={`http://steamcommunity.com/profiles/${player.id}`}>
                            {value}
                          </a>
                        </TableRowColumn>
                      )
                    } else {
                      return <TableRowColumn key={index}>{value}</TableRowColumn>
                    }

                    /* include platform logo */
                  } else if (column === 'platform') {
                    return (
                      <TableRowColumn key={index}>
                        <img src={`http://hugo.grochau.com/sam-ranking/images/${value}.svg` } width="15px" height="15px"/>
                      </TableRowColumn>
                    )
                  } else {
                    return <TableRowColumn key={index}>{value}</TableRowColumn>
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    players: state.players.players,
    sortPlaylist: state.players.sortPlaylist,
    sortOrder: state.players.sortOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
