import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';
import { makeSelectPlayers, makeSelectOrderColumn, makeSelectPage, makeSelectColumns } from './selectors';
import { makeSelectIsSmall } from '../../containers/App/selectors';
import OrderedTable from '../../components/OrderedTable';
import SearchBar from '../../components/SearchBar';
import * as actions from './actions';
import { RANK_COLUMNS } from './constants';

const OptionsContainer = styled.div`
  padding: 0 15px
`;

export class Players extends React.PureComponent {

  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    const { orderColumn, page, isSmallApp, players, columns,
      orderPlayers, changePage, playerSearch } = this.props;

    return (
      <div>
        <OptionsContainer>
          {isSmallApp && (
            <SelectField
              fullWidth
              floatingLabelText="Rank"
              value={orderColumn}
              onChange={(e, k, p) => orderPlayers(p)}
            >
              {RANK_COLUMNS.map((r) =>
                <MenuItem key={r} value={r} primaryText={r} />
              )}
            </SelectField>
          )}
          <SearchBar
            values={players.map((p) => p.name)}
            onType={playerSearch}
            hintText={'Player name'}
          />
        </OptionsContainer>
        <OrderedTable
          columns={columns}
          data={players}
          limit={100}
          orderColumn={orderColumn}
          page={page}
          onColumnClicked={orderPlayers}
          onPageChangeRequested={changePage}
        />
      </div>
    );
  }
}

Players.propTypes = {
  orderColumn: React.PropTypes.string,
  page: React.PropTypes.number,
  players: React.PropTypes.array,
  columns: React.PropTypes.array,
  isSmallApp: React.PropTypes.bool,

  fetchPlayers: React.PropTypes.func,
  orderPlayers: React.PropTypes.func,
  playerSearch: React.PropTypes.func,
  changePage: React.PropTypes.func,
};

Players.defaultProps = {
  orderColumn: 'sum',
  page: 0,
  players: [],
  columns: [],
  isSmallApp: false,

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
  isSmallApp: makeSelectIsSmall(),
  columns: makeSelectColumns(),
});

export default connect(mapStateToProps, actions)(Players);

