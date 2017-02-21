import React from 'react';

import { App } from '../index';
import { shallowWithIntl } from '../../../../internals/testing/enzymeHelpers';

describe('<App />', () => {
  const localStorageGetItem = jest.fn();
  window.localStorage = { getItem: localStorageGetItem };
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallowWithIntl(
      <App location={{ locationBeforeTransitions: { pathname: 'Home' } }}>
        {children}
      </App>
      );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('Should try to get the auth token', () =>
    expect(localStorageGetItem).toHaveBeenCalledWith('token')
  );
});
