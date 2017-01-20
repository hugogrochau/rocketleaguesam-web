import React from 'react';

import App from '../index';
import { shallowWithIntl } from '../../../utils/reactIntlHelpers';

describe('<App />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallowWithIntl(
      <App location={{ pathname: 'Home' }}>
        {children}
      </App>
      , { context: {} });
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
