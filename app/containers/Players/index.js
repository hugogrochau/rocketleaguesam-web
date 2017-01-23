import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPlayers, makeSelectOrderColumn, makeSelectPage } from './selectors';
import OrderedTable from '../../components/OrderedTable';
import { fetchPlayers, orderPlayers, changePage } from './actions';
import { PLAYER_COLUMNS } from './constants';

export class Players extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    return (
      <OrderedTable
        columns={PLAYER_COLUMNS}
        data={this.props.players}
        limit={100}
        orderColumn={this.props.orderColumn}
        onColumnClicked={this.props.orderPlayers}
        onPageChangeRequested={this.props.changePage}
        page={this.props.page}
      />
    );
  }
}

Players.propTypes = {
  orderColumn: React.PropTypes.string,
  page: React.PropTypes.number,

  players: React.PropTypes.array,
  fetchPlayers: React.PropTypes.func.isRequired,
  orderPlayers: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
};

Players.defaultProps = {
  orderColumn: 'sum',
  page: 0,
  players: [],
};

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers(),
  orderColumn: makeSelectOrderColumn(),
  page: makeSelectPage(),
});

export const mapDispatchToProps = {
  orderPlayers,
  fetchPlayers,
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
