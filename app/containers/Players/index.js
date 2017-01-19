/*
 *
 * Players
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { makeSelectPlayers, makeSelectOrderColumn } from './selectors';
import OrderedTable from '../../components/OrderedTable';
import { fetchPlayers, orderPlayers } from './actions';
import { PLAYER_COLUMNS } from './constants';

export class Players extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    const data = this.props.players.map((p, i) =>
      Object.assign({}, _.omit(p, 'id'), {
        '#': i + 1,
        profileLink: `/player/${p.platform}/${p.id}`,
        platformImage: `${CDN_URL}/${p.platform}.svg`,
      })
    );

    return (
      <div>
        <OrderedTable
          columns={PLAYER_COLUMNS}
          data={data}
          limit={3}
          orderColumn={this.props.orderColumn}
          onColumnClicked={this.props.orderPlayers}
        />
      </div>
    );
  }
}

Players.propTypes = {
  players: React.PropTypes.array,
  orderColumn: React.PropTypes.string,

  orderPlayers: React.PropTypes.func,
  fetchPlayers: React.PropTypes.func,
};

Players.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers(),
  orderColumn: makeSelectOrderColumn(),
});

const mapDispatchToProps = {
  orderPlayers,
  fetchPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
