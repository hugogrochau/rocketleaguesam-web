import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pick from 'lodash/pick';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';
import { makeSelectPlayers, makeSelectOrderColumn, makeSelectPage, makeSelectSmall } from './selectors';
import OrderedTable from '../../components/OrderedTable';
import SearchBar from '../../components/SearchBar';
import { fetchPlayers, orderPlayers, playerSearch, changePage, changeSize } from './actions';
import { PLAYER_COLUMNS, PLAYER_RANK_COLUMNS } from './constants';

const OptionsContainer = styled.div`
  padding: 0 15px
`;

export class Players extends React.PureComponent {

  componentDidMount() {
    this.props.fetchPlayers();
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (window.innerWidth < 960) {
      this.props.changeSize(true);
    } else {
      this.props.changeSize(false);
    }
  }

  render() {
    const { orderColumn, page, small } = this.props;
    const smallColumns = ['platform', 'name', 'profileLink', 'platformImage', orderColumn];

    let players = this.props.players;
    let columns = PLAYER_COLUMNS;
    if (small) {
      columns = columns.filter((c) => smallColumns.includes(c.name));
      players = players.map((p) => pick(p, smallColumns));
    }

    return (
      <div>
        <OptionsContainer>
          {small && (
          <SelectField
            fullWidth
            floatingLabelText="Rank"
            value={orderColumn}
            onChange={(e, k, p) => this.props.orderPlayers(p)}
          >
            {PLAYER_RANK_COLUMNS.map((r) =>
              <MenuItem key={r} value={r} primaryText={r} />
            )}
          </SelectField>
        )}
          <SearchBar
            values={players.map((p) => p.name)}
            onType={this.props.playerSearch}
            hintText={'Player name'}
          />
        </OptionsContainer>
        <OrderedTable
          columns={columns}
          data={players}
          limit={100}
          orderColumn={orderColumn}
          page={page}
          onColumnClicked={this.props.orderPlayers}
          onPageChangeRequested={this.props.changePage}
        />
      </div>
    );
  }
}

Players.propTypes = {
  orderColumn: React.PropTypes.string,
  page: React.PropTypes.number,
  players: React.PropTypes.array,
  small: React.PropTypes.bool,

  fetchPlayers: React.PropTypes.func,
  orderPlayers: React.PropTypes.func,
  playerSearch: React.PropTypes.func,
  changePage: React.PropTypes.func,
  changeSize: React.PropTypes.func,
};

Players.defaultProps = {
  orderColumn: 'sum',
  page: 0,
  players: [],
  small: false,

  fetchPlayers: () => {},
  orderPlayers: () => {},
  playerSearch: () => {},
  changePage: () => {},
  changeSize: () => {},
};

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers(),
  orderColumn: makeSelectOrderColumn(),
  page: makeSelectPage(),
  small: makeSelectSmall(),
});

export const mapDispatchToProps = {
  orderPlayers,
  fetchPlayers,
  playerSearch,
  changePage,
  changeSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
