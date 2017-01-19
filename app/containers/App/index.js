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

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="South American Rocket League Ranking"
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
              containerElement={<Link to="/players"/>}
              primaryText="Players"
            />
            <MenuItem
              containerElement={<Link to="/teams"/>}
              primaryText="Teams"
            />
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
};

App.defaultProps = {
  drawerOpen: false,
};

export default App;
