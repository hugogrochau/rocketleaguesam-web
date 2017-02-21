import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { intlShape } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';

import messages from './messages';
import * as actions from './actions';
import {
  makeSelectPlayer,
  makeSelectLogged,
  makeSelectIsLoggingIn,
  makeSelectDrawerOpen,
  makeSelectLocationState,
} from './selectors';

import MainAppBar from '../../components/MainAppBar';

injectTapEventPlugin();

export class App extends React.PureComponent {

  componentWillMount() {
    this.props.resizeWindow(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => this.props.resizeWindow(window.innerWidth, window.innerHeight));

    const token = localStorage.getItem('token');
    if (token !== null) {
      this.props.loginWithToken(token);
    }
  }

  render() {
    const {
      player, logged, location, drawerOpen, loggingIn,
      children,
      toggleDrawer, requestSteamOID,
    } = this.props;
    const route = location.locationBeforeTransitions.pathname.slice(1);
    const title = this.context.intl.formatMessage(messages.title, { route });
    const description = this.context.intl.formatMessage(messages.description);

    return (
      <MuiThemeProvider>
        <div>
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: description },
            ]}
          />
          <MainAppBar
            {...{ title, toggleDrawer, drawerOpen, player, logged, loggingIn, onLoginRequested: requestSteamOID }}
          />
          {React.Children.toArray(children)}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object.isRequired,

  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
  logged: React.PropTypes.bool,
  loggingIn: React.PropTypes.bool,
  player: React.PropTypes.object,

  toggleDrawer: React.PropTypes.func,
  resizeWindow: React.PropTypes.func,
  requestSteamOID: React.PropTypes.func,
  loginWithToken: React.PropTypes.func,
};

App.defaultProps = {
  children: [],
  drawerOpen: false,
  logged: false,
  loggingIn: false,
  player: {},

  toggleDrawer: () => {},
  resizeWindow: () => {},
  requestSteamOID: () => {},
  loginWithToken: () => {},
};

App.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  drawerOpen: makeSelectDrawerOpen(),
  player: makeSelectPlayer(),
  logged: makeSelectLogged(),
  loggingIn: makeSelectIsLoggingIn(),
  location: makeSelectLocationState(),
});

export default connect(mapStateToProps, actions)(App);
