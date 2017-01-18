import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object,
  }

  static defaultProps = {
    children: [],
  }

  constructor(props) {
    super(props)
    this.state = { drawerOpen: false }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="South American Rocket League Ranking"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <div className="content">
            { this.props.children }
          </div>
          <Drawer
            docked={false}
            open={this.state.drawerOpen}
            onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
          >
            <AppBar
              title="Menu"
              iconElementLeft={<span />}
            />
            <MenuItem
              containerElement={<Link to="/players" />}
              primaryText="Players"
            />
            <MenuItem
              containerElement={<Link to="/teams" />}
              primaryText="Teams"
            />
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }

  handleToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen })
}

