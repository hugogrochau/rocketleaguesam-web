import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import { white } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router';

const LoggedMenu = ({ links, logged, onLoginRequested }) => {
  if (logged) {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color={white} /></IconButton>
      }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {links.map(({ name, link }) =>
          <MenuItem
            key={name}
            containerElement={<Link to={link} />}
          >
            {name}
          </MenuItem>
      )}
      </IconMenu>);
  }
  return (
    <MenuItem onClick={onLoginRequested} >
      <img
        src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_small.png"
        alt="Login with Steam"
      />
    </MenuItem>
  );
};

LoggedMenu.propTypes = {
  links: React.PropTypes.array,
  logged: React.PropTypes.bool,

  onLoginRequested: React.PropTypes.func,
};

LoggedMenu.defaultProps = {
  links: [],
  logged: false,

  onLoginRequested: () => {},
};

export default LoggedMenu;
