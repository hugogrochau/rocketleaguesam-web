import { fromJS } from 'immutable';
import {
  TEAMS_FETCH_SUCCEEDED,
  TEAMS_FETCH_FAILED,
} from './constants';

const initialState = fromJS({
  teams: [],
});

function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case TEAMS_FETCH_SUCCEEDED:
      return state.set('teams', fromJS(action.teams));
    case TEAMS_FETCH_FAILED:
      return state.set('failedTeamFetch', true);
    default:
      return state;
  }
}

export default teamsReducer;
