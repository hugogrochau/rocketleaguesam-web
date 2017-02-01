import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { intlShape } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';
import messages from './messages';
import MainAppBar from '../MainAppBar';

injectTapEventPlugin();

export const App = ({ location, children }, context) => {
  const route = location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2);

  return (
    <MuiThemeProvider>
      <div>
        <Helmet
          title={context.intl.formatMessage(messages.title, { route })}
          meta={[
            { name: 'description', content: context.intl.formatMessage(messages.description) },
          ]}
        />
        <MainAppBar title={context.intl.formatMessage(messages.title, { route })} />
        {React.Children.toArray(children)}
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
};

App.defaultProps = {
  children: [],
};

App.defaultProps = {
  drawerOpen: false,
};

App.contextTypes = {
  intl: intlShape,
};

export default App;
