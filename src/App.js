import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router';

injectTapEventPlugin();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {drawerOpen: false};
  }

  handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="South American Rocket League Ranking"
            onLeftIconButtonTouchTap={this.handleToggle}/>
          <div className="content">
            {this.props.children}
          </div>
          <Drawer
            docked={false}
            open={this.state.drawerOpen}
            onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
          >
            <AppBar
              title="Menu"
              iconElementLeft={<span></span>}/>
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

