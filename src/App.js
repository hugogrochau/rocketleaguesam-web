import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RankingTable from './RankingTable'


export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <RankingTable/>
      </MuiThemeProvider>
    );
  }
}
