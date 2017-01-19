/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { intlShape } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';
import messages from './messages';

injectTapEventPlugin();

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const route = this.props.location.pathname.charAt(1).toUpperCase() + this.props.location.pathname.slice(2);

    return (
      <MuiThemeProvider>
        <div>
          <Helmet
            title={this.context.intl.formatMessage(messages.title, { route })}
            meta={[
              { name: 'description', content: this.context.intl.formatMessage(messages.description) },
            ]}
          />
          <AppBar
            title={this.context.intl.formatMessage(messages.title, { route })}
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          {React.Children.toArray(this.props.children)}
          <Drawer
            docked={false}
            open={this.props.drawerOpen}
            /* TODO: Connect to redux and make this an action */
            onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
          >
            <AppBar
              title="Menu"
              iconElementLeft={<span />}
            />
            <MenuItem
              containerElement={<Link to="/players">Players</Link>}
            />
            <MenuItem
              containerElement={<Link to="/teams">Teams</Link>}
            />
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
};

App.defaultProps = {
  drawerOpen: false,
};

App.contextTypes = {
  intl: intlShape,
};

export default App;
