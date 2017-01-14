
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import RankingTable from './RankingTable'
import Teams from './Teams'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RankingTable}/>
      <Route path="players" component={RankingTable}/>
      <Route path="teams" component={Teams} />
    </Route>
    {/*<Route path="*" component={NoMatch}/>*/}
  </Router>
), document.getElementById('root'));
