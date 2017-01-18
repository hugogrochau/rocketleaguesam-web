import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import App from './containers/App'
import Players from './containers/Players'
import Teams from './containers/Teams'
import configureStore from './store'

const store = configureStore({}, browserHistory)

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Players} />
        <Route path="players" component={Players} />
        <Route path="teams" component={Teams} />
      </Route>
      {/* <Route path="*" component={NoMatch}/> */}
    </Router>
  </Provider>
), document.getElementById('root'))
