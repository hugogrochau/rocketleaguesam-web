import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTeam, makeSelectFailedTeamFetch, makeSelectFetchingTeam } from './selectors';
import { makeSelectPlayer, makeSelectLogged } from '../App/selectors';
import TeamView from './components/TeamView';

import * as actions from './actions';

export class Team extends React.PureComponent {

  componentDidMount() {
    if (this.props.params.id) {
      this.props.fetchTeam(this.props.params.id);
      // if player is logged in and has a team
    } else if (this.props.logged && this.props.player.team_id) {
      this.props.fetchTeam(this.props.player.team_id);
    }
  }

  render() {
    const { failedTeamFetch, fetchingTeam, logged, team } = this.props;

    if (failedTeamFetch) {
      return (
        <h2>Team not found</h2>
      );
    }

    if (fetchingTeam) {
      return (
        <h2>Loading...</h2>
      );
    }

    if (team.id) {
      return (
        <TeamView team={team} />
      );
    }

    if (logged) {
      return (
        <div>
          <h2>Create a team:</h2>
        </div>
      );
    }

    return (
      <h2>Log in to create a team</h2>
    );
  }
}

Team.propTypes = {
  failedTeamFetch: React.PropTypes.bool,
  fetchingTeam: React.PropTypes.bool,
  logged: React.PropTypes.bool,
  player: React.PropTypes.object,
  team: React.PropTypes.object,
  params: React.PropTypes.object,

  fetchTeam: React.PropTypes.func,
};

Team.defaultProps = {
  failedTeamFetch: false,
  fetchingTeam: false,
  logged: false,
  team: {},
  params: {},
  player: {},

  setTeam: () => {},
  fetchTeam: () => {},
};

const mapStateToProps = createStructuredSelector({
  failedTeamFetch: makeSelectFailedTeamFetch(),
  fetchingTeam: makeSelectFetchingTeam(),
  logged: makeSelectLogged(),
  player: makeSelectPlayer(),
  team: makeSelectTeam(),
});

export default connect(mapStateToProps, actions)(Team);
