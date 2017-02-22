import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import LoggedMenu from '../LoggedMenu';


const MainAppBar = ({ drawerOpen, logged, loggingIn, player, title, toggleDrawer, onLoginRequested, onLogoutRequested }) => {
  const menuLinks = [
    { name: 'Players', link: '/players' },
    { name: 'Teams', link: '/teams' },
  ];

  const playerLinks = [];

  if (logged) {
    playerLinks.push({
      name: 'Profile',
      link: `/player/${player.platform}/${player.id}`,
    });
    if (player.team) {
      playerLinks.push({
        name: player.team.name,
        link: `/team/${player.team.id}`,
      });
    }
  }

  return (
    <div>
      <AppBar
        title={title}
        onLeftIconButtonTouchTap={toggleDrawer}
        iconElementRight={loggingIn ?
          <div /> :
          <LoggedMenu {...{ links: playerLinks, logged, onLoginRequested, onLogoutRequested }} />}
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
    </div>
  );
};

MainAppBar.propTypes = {
  drawerOpen: React.PropTypes.bool,
  logged: React.PropTypes.bool,
  loggingIn: React.PropTypes.bool,
  player: React.PropTypes.object,
  title: React.PropTypes.string,

  toggleDrawer: React.PropTypes.func,
  onLoginRequested: React.PropTypes.func,
  onLogoutRequested: React.PropTypes.func,
};

MainAppBar.defaultProps = {
  drawerOpen: '',
  logged: false,
  loggingIn: false,
  player: {},
  title: 'Rocket League South America',

  toggleDrawer: () => {},
  onLoginRequested: () => {},
  onLogoutRequested: () => {},
};

export default MainAppBar;
