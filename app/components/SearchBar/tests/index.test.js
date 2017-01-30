import React from 'react';
import { mountWithIntlMui } from '../../../../internals/testing/enzymeHelpers';

import SearchBar from '../index';

describe('<SearchBar />', () => {
  const mockOnType = jest.fn();
  const renderedComponent = mountWithIntlMui(
    <SearchBar onType={mockOnType} />
  );

  it('should call onType', () => {
    renderedComponent.find('input').simulate('change', { target: { value: 'foobar' } });
    expect(mockOnType).toBeCalledWith('foobar');
  });
});
