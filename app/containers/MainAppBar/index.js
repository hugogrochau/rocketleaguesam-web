/*
 *
 * MainAppBar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectDrawerOpen } from './selectors';
import { toggleDrawer } from './actions';
import messages from './messages';

export class MainAppBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
        />
        <Drawer
          docked={false}
          open={this.props.drawerOpen}
          onRequestChange={this.props.toggleDrawer}
        >
          <AppBar
            title="Menu"
            iconElementLeft={<span />}
          />
          <MenuItem
            containerElement={<Link to="/players" />}
          >
            <FormattedMessage {...messages.players} />
          </MenuItem>
          <MenuItem
            containerElement={<Link to="/teams" />}
          >
            <FormattedMessage {...messages.teams} />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

MainAppBar.propTypes = {
  drawerOpen: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,

  toggleDrawer: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  drawerOpen: makeSelectDrawerOpen(),
});

const mapDispatchToProps = {
  toggleDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
