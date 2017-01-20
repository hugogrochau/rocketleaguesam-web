/*
 *
 * Players
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { intlShape } from 'react-intl';
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
      <div>
        <OrderedTable
          columns={PLAYER_COLUMNS}
          data={this.props.players}
          limit={100}
          orderColumn={this.props.orderColumn}
          onColumnClicked={this.props.orderPlayers}
          onPageChangeRequested={this.props.changePage}
          page={this.props.page}
        />
      </div>
    );
  }
}

Players.propTypes = {
  players: React.PropTypes.array,
  orderColumn: React.PropTypes.string,
  page: React.PropTypes.number,

  orderPlayers: React.PropTypes.func,
  fetchPlayers: React.PropTypes.func,
  changePage: React.PropTypes.func,
};

Players.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers(),
  orderColumn: makeSelectOrderColumn(),
  page: makeSelectPage(),
});

const mapDispatchToProps = {
  orderPlayers,
  fetchPlayers,
  changePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
