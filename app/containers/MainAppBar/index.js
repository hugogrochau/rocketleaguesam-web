import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectDrawerOpen } from './selectors';
import { toggleDrawer as toggleDrawerAction } from './actions';
import messages from './messages';

export const MainAppBar = ({ drawerOpen, title, toggleDrawer }) =>
  <div>
    <AppBar
      title={title}
      onLeftIconButtonTouchTap={toggleDrawer}
    />
    <Drawer
      docked={false}
      open={drawerOpen}
      onRequestChange={toggleDrawer}
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
  </div>;

MainAppBar.propTypes = {
  drawerOpen: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,

  toggleDrawer: React.PropTypes.func,
};

MainAppBar.defaultProps = {
  drawerOpen: false,
  toggleDrawer: () => {},
};

const mapStateToProps = createStructuredSelector({
  drawerOpen: makeSelectDrawerOpen(),
});

const mapDispatchToProps = {
  toggleDrawer: toggleDrawerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
