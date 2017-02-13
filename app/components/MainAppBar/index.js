import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

const MainAppBar = ({ drawerOpen, title, toggleDrawer, menuLinks }) =>
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
      {menuLinks.map(({ name, link }) =>
        <MenuItem
          key={name}
          containerElement={<Link to={link} />}
        >
          {name}
        </MenuItem>
      )}
    </Drawer>
  </div>;

MainAppBar.propTypes = {
  drawerOpen: React.PropTypes.bool,
  title: React.PropTypes.string,
  toggleDrawer: React.PropTypes.func,
  menuLinks: React.PropTypes.array,
};

MainAppBar.defaultProps = {
  drawerOpen: '',
  title: 'Rocket League South America',
  toggleDrawer: () => {},
  menuLinks: [],
};

export default MainAppBar;
