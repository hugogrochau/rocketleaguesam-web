import React from 'react';
import { mountWithIntlMui } from '../../../../../../internals/testing/enzymeHelpers';

import SearchBar from '../index';

describe('<SearchBar />', () => {
  const mockOnChange = jest.fn();
  const renderedComponent = mountWithIntlMui(
    <SearchBar onChange={mockOnChange} />
  );

  it('should call onType', () => {
    renderedComponent.find('input').simulate('change', { target: { value: 'foobar' } });
    expect(mockOnChange).toBeCalledWith('foobar');
  });
});
