/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { intlShape } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';
import messages from './messages';
import MainAppBar from '../MainAppBar';

injectTapEventPlugin();

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const route = this.props.location.pathname.charAt(1).toUpperCase() + this.props.location.pathname.slice(2);

    return (
      <MuiThemeProvider>
        <div>
          <Helmet
            title={this.context.intl.formatMessage(messages.title, { route })}
            meta={[
              { name: 'description', content: this.context.intl.formatMessage(messages.description) },
            ]}
          />
          <MainAppBar title={this.context.intl.formatMessage(messages.title, { route })} />
          {React.Children.toArray(this.props.children)}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.node,
};

App.defaultProps = {
  drawerOpen: false,
};

App.contextTypes = {
  intl: intlShape,
};

export default App;
