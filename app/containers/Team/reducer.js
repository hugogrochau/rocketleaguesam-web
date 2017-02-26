import { fromJS } from 'immutable';
import {
  SET_TEAM,
  FETCH_TEAM,
  FETCH_TEAM_FAILED,
} from './constants';

const initialState = fromJS({
  team: {},
  fetchingTeam: false,
  failedTeamFetch: false,

});

function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAM:
      return state.merge({
        fetchingTeam: false,
        team: fromJS(action.team),
      });
    case FETCH_TEAM:
      return state.set('fetchingTeam', true);
    case FETCH_TEAM_FAILED:
      return state.merge({
        fetchingTeam: false,
        failedTeamFetch: true,
      });
    default:
      return state;
  }
}

export default teamsReducer;
