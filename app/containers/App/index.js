import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { intlShape } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';

import messages from './messages';
import * as actions from './actions';
import { makeSelectDrawerOpen, makeSelectLocationState } from './selectors';

import MainAppBar from '../../components/MainAppBar';

injectTapEventPlugin();

const menuLinks = [
  { name: 'Players', link: '/players' },
  { name: 'Teams', link: '/teams' },
];

export class App extends React.PureComponent {

  componentDidMount() {
    this.props.resizeWindow(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => this.props.resizeWindow(window.innerWidth, window.innerHeight));
  }

  render() {
    const { location, children, drawerOpen, toggleDrawer } = this.props;
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
            {...{ title, toggleDrawer, drawerOpen, menuLinks }}
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

  toggleDrawer: React.PropTypes.func,
  resizeWindow: React.PropTypes.func,
};

App.defaultProps = {
  children: [],
  drawerOpen: false,
  toggleDrawer: () => {},
  resizeWindow: () => {},
};

App.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  drawerOpen: makeSelectDrawerOpen(),
  location: makeSelectLocationState(),
});

export default connect(mapStateToProps, actions)(App);
