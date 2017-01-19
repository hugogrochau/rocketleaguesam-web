/*
 *
 * Players
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import makeSelectPlayers from './selectors';
import messages from './messages';
import OrderedTable from '../../components/OrderedTable';
import { fetchPlayers } from './actions';

export class Players extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.dispatch(fetchPlayers());
  };

  render() {
    const columns = [
      { name: '#' },
      { name: 'name', type: 'link', linkColumn: 'profileLink' },
      { name: 'platform', type: 'image', imageColumn: 'platformImage' },
      { name: '1v1', sortable: true },
      { name: '2v2', sortable: true },
      { name: '3v3s', sortable: true },
      { name: '3v3', sortable: true },
      { name: 'sum', sortable: true },
      { name: 'profileLink', link: true },
      { name: 'platformImage', image: true },
    ];

    const data = this.props.players.map((p, i) =>
      Object.assign({}, _.omit(p, 'id'), {
        '#': i + 1,
        profileLink: `/player/${p.platform}/${p.id}`,
        platformImage: `http://hugo.grochau.com/sam-ranking/images/${p.platform}.svg`,
      })
    );

    return (
      <div>
        <Helmet
          title="Players"
          meta={[
            { name: 'description', content: 'Description of Players' },
          ]}
        />
        <OrderedTable
          {...{ columns, data, limit: 3, sortColumn: 'sum' }}
        />
        {/* <FormattedMessage {...messages.header} /> */}
      </div>
    );
  }
}

Players.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  players: React.PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
